"use client";

import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

export const ProductShowcaseVideo = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Image
        src="/images/product-showcase.png"
        height={1000}
        width={1000}
        alt="Product Showcase"
        className="rounded-xl border shadow-lg"
      />
    );
  }

  return (
    <>
      <video
        src="/videos/product-showcase.mkv"
        autoPlay
        muted
        loop
        className="rounded-xl border shadow-lg"
        poster="/images/applitrack-showcase-poster.png"
      />
    </>
  );
};
