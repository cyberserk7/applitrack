import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Testimonials", href: "/sign-up" },
];

export const LandingNavbar = async () => {
  return (
    <nav className="fixed top-0 z-50 bg-white border-b border-zinc-300 w-full shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 container">
        <div className="flex items-center gap-5">
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src={"/logo-black.png"}
              height={500}
              width={500}
              alt="logo"
              className="h-5 w-fit"
            />
            <h1 className="font-bold text-lg">AppliTrack</h1>
          </Link>

          <Link
            href={"https://github.com/cyberserk7/applitracker"}
            target="_blank"
            className="hidden lg:block shadow-md rounded-xl"
          >
            <Button
              className="group relative inline-flex  items-center justify-center overflow-hidden bg-neutral-800 font-medium text-neutral-200 duration-500 rounded-xl"
              size={"sm"}
            >
              <div className="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
                <div className="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0">
                  <Star className="size-4" strokeWidth={2.5} />
                </div>
                <span className="pl-6">Star on Github</span>
                <div className="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100 flex items-center gap-1">
                  <Github className="size-4" strokeWidth={2.5} />
                </div>
              </div>
            </Button>
          </Link>
        </div>
        <Button
          className="bg-gradient-to-r from-red-600 to-yellow-600 font-semibold shadow-md rounded-xl text-white"
          size={"sm"}
          asChild
        >
          <Link href={"/sign-up"}>Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};
