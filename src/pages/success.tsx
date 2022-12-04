import React, { useMemo } from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "@lib/stripe";
import * as S from "@pageStyles/success";

type Product = {
  name: string;
  imageUrl: string;
  quantity: number;
};

type SuccessProps = {
  customerName: string;
  totalQuantity: number;
  products: Product[];
};

const Success: NextPage<SuccessProps> = ({ customerName, products }) => {
  const isSingleProduct = useMemo(() => products?.length === 1, [products]);

  return (
    <>
      <Head>
        <title>{`Compra efetuada | Ignite Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>
      <S.SuccessContainer>
        <S.Title>Compra efetuada!</S.Title>

        <S.ProductsList numberOfItems={isSingleProduct ? "single" : "multiple"}>
          {products?.map((product) => (
            <S.Product key={product.name}>
              <S.ImageContainer>
                <Image
                  src={product?.imageUrl}
                  width={120}
                  height={110}
                  alt={product?.name}
                />
              </S.ImageContainer>

              <S.Name>
                {product?.name} <S.Quantity>x {product?.quantity}</S.Quantity>
              </S.Name>
            </S.Product>
          ))}
        </S.ProductsList>

        <S.Description>
          Uhuul <S.Highlight>{customerName}</S.Highlight>, seus produtos já
          estão a caminho da sua casa.
        </S.Description>

        <S.BackToHome href="/">Voltar ao catálogo</S.BackToHome>
      </S.SuccessContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string;

  if (!sessionId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const lineItems = session.line_items?.data;

  const filteredProducts = lineItems?.map((item) => {
    const price = item.price as Stripe.Price;
    const product = price.product as Stripe.Product;

    return {
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    };
  });

  return {
    props: {
      customerName,
      products: filteredProducts,
    },
  };
};

export default Success;
