import React, { useCallback, useMemo, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { stripe } from "@lib/stripe";
import CustomNumberInput from "@components/CustomNumberInput";
import Stripe from "stripe";
import { toast } from "react-hot-toast";
import useGetCartSum from "@hooks/cart/useGetCartSum";
import useShoppingCartStore from "@state/shoppingCart/cart";
import * as S from "@styles/pages/product";

type Props = {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
};

export default function Product({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { isFallback, query } = useRouter();
  const { setCartItem, cart } = useShoppingCartStore();
  const quantityOfItemsAlreadyOnCart = useGetCartSum("quantity");
  const priceId = product?.defaultPriceId ?? query.id;

  const addProductToCart = useCallback(() => {
    if (cart.length) {
      const MAX_ITEMS_POSSIBLE_FOR_A_CHECKOUT_ON_STRIPE_API = 100;
      if (
        quantityOfItemsAlreadyOnCart + quantity >
        MAX_ITEMS_POSSIBLE_FOR_A_CHECKOUT_ON_STRIPE_API
      )
        return toast.error("Coloque no máximo 100 itens no carrinho");
    }

    const cartItem = {
      price: priceId,
      quantity,
      imageUrl: product?.imageUrl,
      name: product?.name,
      value: product?.price,
    };

    toast.success("Item adicionado ao carrinho");
    setCartItem(cartItem);
  }, [quantity, cart, priceId]);

  if (isFallback) return <h1>Loading...</h1>;

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      <S.ProductContainer>
        <S.ImageContainer>
          <Image
            src={product?.imageUrl}
            alt={product?.name}
            width={580}
            height={420}
          />
        </S.ImageContainer>

        <S.ProductDetails>
          <S.ProductTitle>{product?.name}</S.ProductTitle>
          <S.ProductPrice>{product.price}</S.ProductPrice>

          <S.ProductDescription>{product?.description}</S.ProductDescription>

          <S.BottomSectionContainer>
            <CustomNumberInput value={quantity} setValue={setQuantity} />

            <S.BuyButton onClick={addProductToCart}>
              Adicionar ao carrinho
            </S.BuyButton>
          </S.BottomSectionContainer>
        </S.ProductDetails>
      </S.ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};

  const product = await stripe.products.retrieve(id as string, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((price.unit_amount as number) / 100);

  const imageToUse = product.images[0];

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: imageToUse,
        price: formattedPrice,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 Hour
  };
};
