"use client";

import ShimmerButton from "@/components/magicui/shimmer-button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { Skeleton } from "@/components/ui/skeleton";

export const HeroSection = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getCount = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/get-application-count");
        setCount(res.data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCount();
  }, []);
  return (
    <m.div
      className="text-center flex flex-col items-center md:items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
    >
      <h1 className="text-[2rem] md:text-[3rem]  lg:text-[3.5rem] xl:text-[3.8rem] font-bold bg-gradient-to-r from-red-600  to-yellow-600 bg-clip-text text-transparent ">
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
            <span className="whitespace-pre-wrap text-center  leading-none font-medium text-white dark:from-white dark:to-slate-900/10 lg:text-xl ">
              Get started, it&apos;s free
            </span>
            <ChevronRight className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition" />
          </ShimmerButton>
        </Link>
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <div className="flex gap-1.5">
            <span>Tracking</span>
            <div className="flex items-center">
              {isLoading ? (
                <Skeleton className="size-5 bg-zinc-200" />
              ) : (
                <span className="font-semibold">{count}</span>
              )}
            </div>
            <span>applications and counting!</span>
          </div>
        </AnimatedShinyText>
      </div>
    </m.div>
  );
};
