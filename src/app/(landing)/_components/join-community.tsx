import Globe from "@/components/magicui/globe";
import Meteors from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export const JoinCommunity = () => {
  return (
    <div className="w-full flex justify-center items-center py-10 lg:py-20 rounded-xl relative  lg:border overflow-hidden text-center">
      <div className="flex flex-col gap-2 items-center w-full lg:max-w-xl z-10">
        <span className="text-lg md:text-2xl xl:text-2.5xl font-semibold text-orange-500">
          Community
        </span>
        <h2 className="text-3xl md:text-3xl xl:text-5xl font-bold">
          Join the Community
        </h2>
        <span className="text-gray-500/80 text-base lg:text-lg">
          Join us as a contributors and help shape Applitrack.
        </span>
        <Button className="w-max flex items-center gap-2 mt-5" size={"lg"}>
          <Github className="size-4" /> Github Repository
        </Button>
      </div>
      <div className="hidden lg:block">
        <Globe className="top-36" />
      </div>
    </div>
  );
};
