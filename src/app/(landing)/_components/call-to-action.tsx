import ShimmerButton from "@/components/magicui/shimmer-button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <div className="text-center flex flex-col items-center md:items-center">
      <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.8rem] font-bold bg-gradient-to-r from-red-600  to-yellow-600 bg-clip-text text-transparent ">
        All-In-One Job Application Manager
      </h1>
      <p className="text-gray-500/80 md:text-lg lg:text-xl">
        Track applications, organize your documents, and find new oppurtunities
        — all in one place.
      </p>
      <Link href={"/sign-up"}>
        <ShimmerButton
          className="shadow-2xl mt-5 md:mt-10 flex items-center text-lg"
          background="linear-gradient(to bottom, rgba(197, 48, 48, 1), rgba(221, 107, 32, 1))"
          shimmerSize="0.1em"
          shimmerDuration="1.2s"
        >
          <span className="whitespace-pre-wrap text-center text-sm leading-none font-medium text-white dark:from-white dark:to-slate-900/10 lg:text-xl">
            Get started for free
          </span>
          <ChevronRight className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition" />
        </ShimmerButton>
      </Link>
    </div>
  );
};
