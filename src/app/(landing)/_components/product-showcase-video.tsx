"use client";

import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { motion as m } from "framer-motion";

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
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
    >
      <video
        src="/videos/product-showcase.mkv"
        autoPlay
        muted
        loop
        className="rounded-xl border shadow-lg"
        poster="/images/applitrack-showcase-poster.png"
      />
    </m.div>
  );
};
