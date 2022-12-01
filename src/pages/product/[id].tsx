import React, { useState } from "react";
import * as S from "@styles/pages/product";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "src/lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

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
  const { isFallback } = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleBuyProduct = async () => {
    try {
      setIsRedirecting(true);

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
        productId: product.id,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      console.log("err", err);
      alert("falha ao redirecionar ao checkout");
      setIsRedirecting(false);
    }
  };

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
          <S.ProductPrice>R$ 67.00</S.ProductPrice>

          <S.ProductDescription>{product?.description}</S.ProductDescription>

          <S.BuyButton disabled={isRedirecting} onClick={handleBuyProduct}>
            Comprar agora
          </S.BuyButton>
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
