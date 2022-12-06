import type { AppProps } from "next/app";
import Link from "next/link";
import Image from "next/image";
import { globalStyles } from "@styles/global";
import logoImage from "@assets/logo.svg";
import useIsCartMenuVisibleStore from "@state/shoppingCart/menu";
import { getColors } from "@utils/getColors";
import { Toaster } from "react-hot-toast";
import * as S from "@pageStyles/app";
import { useCallback } from "react";
import dynamic from "next/dynamic";
import MetaTags from "@components/MetaTags";

// Stops hydration error (https://nextjs.org/docs/messages/react-hydration-error)
const CartMenu = dynamic(() => import("@components/CartMenu"), {
  ssr: false,
});

globalStyles();

const gray100 = getColors("gray100");
const gray800 = getColors("gray800");
const white = getColors("white");

const App = ({ Component, pageProps }: AppProps) => {
  const { setVisible, setCanShowCart } = useIsCartMenuVisibleStore();

  const onClickOpenCartMenu = useCallback(() => {
    setCanShowCart(true);
    setVisible(true);
  }, [setCanShowCart, setVisible]);

  return (
    <>
      <MetaTags
        title="Ignite Shop"
        description="Buy your favourite shirts here!"
      />
      <S.Container>
        <S.Header>
          <Link href="/">
            <Image src={logoImage} alt="Logo image" />
          </Link>

          <S.CartIconContainer onClick={onClickOpenCartMenu}>
            <S.CartIcon size={24} color={gray100} />
          </S.CartIconContainer>
        </S.Header>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor: gray800,
              color: white,
            },
          }}
        />

        <CartMenu />

        <Component {...pageProps} />
      </S.Container>
    </>
  );
};

export default App;
