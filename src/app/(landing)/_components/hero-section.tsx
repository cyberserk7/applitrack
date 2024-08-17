"use client";

import ShimmerButton from "@/components/magicui/shimmer-button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import NumberTicker from "@/components/magicui/number-ticker";
import { Shadows_Into_Light } from "next/font/google";
import { cn } from "@/lib/utils";

const indieFlower = Shadows_Into_Light({ subsets: ["latin"], weight: ["400"] });

export const HeroSection = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await axios.get("/api/get-application-count");
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    getCount();
  }, []);

  return (
    <m.div
      className="text-center flex flex-col items-center md:items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
    >
      <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.8rem] font-bold bg-gradient-to-r from-red-600  to-yellow-600 bg-clip-text text-transparent ">
        All-In-One Job Application Manager
      </h1>
      <p className="text-gray-500/80 md:text-lg lg:text-xl">
        Track applications, organize your documents, and find new oppurtunities
        — all in one place.
      </p>
      <div className="flex flex-col gap-5 items-center">
        <Link href={"/sign-up"}>
          <ShimmerButton
            className="shadow-2xl mt-5 md:mt-10 flex items-center text-lg"
            background="linear-gradient(to bottom, rgba(197, 48, 48, 1), rgba(221, 107, 32, 1))"
            shimmerSize="0.1em"
            shimmerDuration="1.2s"
          >
            <span className="whitespace-pre-wrap text-center  leading-none font-medium text-white dark:from-white dark:to-slate-900/10 lg:text-xl">
              Get started, it&apos;s free
            </span>
            <ChevronRight className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition" />
          </ShimmerButton>
        </Link>
        <span className={cn("text-zinc-400 text-sm z-10 flex gap-1.5")}>
          <span>Tracking</span>
          <NumberTicker
            value={count}
            className="text-zinc-400 tracking-tighter font-semibold w-max"
          />
          <span>applications and counting!</span>
        </span>
      </div>
    </m.div>
  );
};
