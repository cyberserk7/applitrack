import Globe from "@/components/magicui/globe";
import Meteors from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export const JoinCommunity = () => {
  return (
    <div className="w-full flex justify-center items-center py-10 lg:py-20 rounded-xl relative  lg:border overflow-hidden text-center">
      <div className="flex flex-col gap-2 items-center w-full lg:max-w-2xl z-10">
        <span className="text-lg lg:text-xl font-semibold text-orange-500">
          Open Source
        </span>
        <h2 className="text-3xl md:text-3xl xl:text-4xl font-bold">
          Join the Community and Contribute
        </h2>
        <span className="text-gray-500/80 text-base lg:text-lg">
          Whether you&apos;re a developer looking to contribute to the project
          or a user interested in the inner workings of the app, you can dive
          right in and be a part of our journey.
        </span>
        <Button
          className="w-max flex items-center gap-2 mt-5"
          size={"lg"}
          asChild
        >
          <Link
            href={"https://github.com/cyberserk7/applitracker"}
            target={"_blank"}
          >
            <Github className="size-4" /> Github Repository
          </Link>
        </Button>
      </div>
      <div className="hidden lg:block">
        <Globe className="top-36" />
      </div>
    </div>
  );
};
