import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex justify-center py-20 md:py-40 lg:py-0 lg:items-center">
      <div className=" text-center flex flex-col  items-center md:items-center">
        <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.8rem] font-bold bg-gradient-to-r from-red-600  to-yellow-600 bg-clip-text text-transparent ">
          All-In-One Job Application Manager
        </h1>
        <p className="text-gray-500/80 md:text-lg lg:text-xl">
          Track applications, organize your documents, and find new
          oppurtunities — all in one place.
        </p>
        <Button
          className="mt-10 font-normal lg:text-lg h-max py-3 px-5 rounded-full bg-gradient-to-b from-red-700  to-orange-600 shadow-md group"
          asChild
        >
          <Link href={"/sign-up"}>
            Get started for free
            <ChevronRight className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
