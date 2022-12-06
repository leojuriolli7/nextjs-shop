import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const MetaTags: React.FC<Props> = ({ title, description, image, url }) => {
  const DEFAULT_IMAGE_URL = `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/small-logo.png`;

  const currentTitle = title || "Ignite Shop";
  const currentDescription = description || "Buy your favourite shirts here!";
  const currentImage = image || DEFAULT_IMAGE_URL;
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/assets/icons/favicon.ico" />
      <meta name="title" content={currentTitle} />
      <meta name="description" content={currentDescription} />
      <meta name="color-scheme" content="dark" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={currentImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={currentDescription} />
      <meta property="twitter:image" content={currentImage} />
    </Head>
  );
};

export default MetaTags;
