import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { stripe } from "src/lib/stripe";
import * as S from "@pageStyles/home";
import "keen-slider/keen-slider.min.css";
import Stripe from "stripe";
import Head from "next/head";

type Props = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
};

export default function Home({ products }: Props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
    breakpoints: {
      "(max-width: 965px)": {
        slides: {
          perView: 1.2,
          spacing: 20,
        },
      },
      "(max-width: 400px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer>
        <S.SliderContainer ref={sliderRef} className="keen-slider">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="keen-slider__slide"
            >
              <S.Product>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={520}
                  height={480}
                />

                <S.Footer>
                  <S.ProductName>{product.name}</S.ProductName>
                  <S.ProductPrice>{product.price}</S.ProductPrice>
                </S.Footer>
              </S.Product>
            </Link>
          ))}
        </S.SliderContainer>
      </S.HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format((price.unit_amount as number) / 100);

    const imageToUse = product.images[0];

    return {
      id: product.id,
      name: product.name,
      imageUrl: imageToUse,
      price: formattedPrice,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Hours
  };
};
