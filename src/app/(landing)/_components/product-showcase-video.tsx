"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const ProductShowcaseVideo = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="aspect-video w-full h-fit">
            <Skeleton className="w-full h-full"></Skeleton>
          </div>
        }
      >
        <video
          src="https://res.cloudinary.com/dfdlzzfej/video/upload/v1723190798/product-showcase_tkek3s.mp4"
          autoPlay
          muted
          loop
          className="rounded-xl border shadow-lg"
        />
      </Suspense>
    </>
  );
};
