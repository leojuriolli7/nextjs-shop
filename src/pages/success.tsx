import React from "react";
import * as S from "@pageStyles/success";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { stripe } from "src/lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

type SuccessProps = {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
};

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>{`Compra efetuada | Ignite Shop`}</title>

        <meta name="robots" content="noindex" />
      </Head>
      <S.SuccessContainer>
        <S.Title>Compra efetuada!</S.Title>

        <S.ImageContainer>
          <Image
            src={product?.imageUrl}
            width={120}
            height={110}
            alt={product?.name}
          />
        </S.ImageContainer>

        <S.Description>
          Uhuul <S.Highlight>{customerName}</S.Highlight>, sua{" "}
          <S.Highlight>{product?.name}</S.Highlight> já está a caminho de sua
          casa.
        </S.Description>

        <S.BackToHome href="/">Voltar ao catálogo</S.BackToHome>
      </S.SuccessContainer>
    </>
  );
}

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
  const product = session.line_items?.data?.[0]?.price
    ?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
