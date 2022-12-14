import React, { useCallback, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { stripe } from "@lib/stripe";
import CustomNumberInput from "@components/CustomNumberInput";
import Stripe from "stripe";
import { toast } from "react-hot-toast";
import ShouldRender from "@components/ShouldRender";
import Shimmer from "@components/Shimmer";
import useGetCartSum from "@hooks/cart/useGetCartSum";
import useShoppingCartStore from "@state/shoppingCart/cart";
import * as S from "@styles/pages/product";
import MetaTags from "@components/MetaTags";

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

const Product: NextPage<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { query, isFallback: isLoading } = useRouter();
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
  }, [
    cart.length,
    priceId,
    quantity,
    product,
    setCartItem,
    quantityOfItemsAlreadyOnCart,
  ]);

  return (
    <>
      <ShouldRender if={product?.name}>
        <MetaTags
          title={product?.name}
          image={product?.imageUrl}
          description={product?.description}
        />
      </ShouldRender>
      <S.ProductContainer>
        <S.ImageContainer>
          <ShouldRender if={!isLoading}>
            <Image
              src={product?.imageUrl}
              alt={product?.name}
              width={580}
              height={420}
            />
          </ShouldRender>
        </S.ImageContainer>

        <S.ProductDetails>
          <ShouldRender if={isLoading}>
            <Shimmer style={{ width: 260, height: 30 }} />

            <Shimmer style={{ width: 100, height: 30, marginTop: 20 }} />

            {Array.from({ length: 5 }).map((_, i) => (
              <Shimmer
                key={i}
                style={{ width: "100%", height: 15, marginTop: 10 }}
              />
            ))}
          </ShouldRender>

          <ShouldRender if={!isLoading}>
            <S.ProductTitle>{product?.name}</S.ProductTitle>

            <S.ProductPrice>{product?.price}</S.ProductPrice>

            <S.ProductDescription>{product?.description}</S.ProductDescription>
          </ShouldRender>

          <S.BottomSectionContainer>
            <CustomNumberInput value={quantity} setValue={setQuantity} />

            <S.BuyButton disabled={isLoading} onClick={addProductToCart}>
              Adicionar ao carrinho
            </S.BuyButton>
          </S.BottomSectionContainer>
        </S.ProductDetails>
      </S.ProductContainer>
    </>
  );
};

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

export default Product;
