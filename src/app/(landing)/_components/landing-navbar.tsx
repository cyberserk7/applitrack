import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <nav className=" bg-white border-b border-zinc-300">
      <div className="flex items-center justify-between p-5 container">
        <div className="flex items-center gap-5">
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src={"/logo-black.png"}
              height={500}
              width={500}
              alt="logo"
              className="h-7 w-fit"
            />
            <h1 className="font-semibold text-xl">AppliTrack</h1>
          </Link>

          <Link
            href={"https://github.com/cyberserk7/applitracker"}
            target="_blank"
            className="hidden lg:block"
          >
            <Button
              className="group relative inline-flex  items-center justify-center overflow-hidden rounded-md bg-neutral-950 font-medium text-neutral-200 duration-500"
              size={"sm"}
            >
              <div className="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
                <div className="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0">
                  <Star className="size-4" />
                </div>
                <span className="pl-6">Star on Github</span>
                <div className="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100 flex items-center gap-1">
                  <Github className="size-4" />
                </div>
              </div>
            </Button>
          </Link>
        </div>
        <Button
          className="bg-gradient-to-r from-red-600 to-yellow-600 font-normal"
          size={"sm"}
          asChild
        >
          <Link href={"/sign-up"}>Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};
