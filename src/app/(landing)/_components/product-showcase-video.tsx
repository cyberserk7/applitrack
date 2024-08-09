"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const ProductShowcaseVideo = () => {
  return (
    <>
      <video
        src="/videos/product-showcase.mp4"
        autoPlay
        muted
        loop
        className="rounded-xl border shadow-lg"
      />
    </>
  );
};
