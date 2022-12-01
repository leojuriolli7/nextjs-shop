import type { AppProps } from "next/app";
import Image from "next/image";
import * as S from "@pageStyles/app";
import { globalStyles } from "../styles/global";
import logoImage from "../assets/logo.svg";
import Link from "next/link";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <S.Header>
        <Link href="/">
          <Image src={logoImage} alt="Logo image" />
        </Link>
      </S.Header>

      <Component {...pageProps} />
    </S.Container>
  );
}
