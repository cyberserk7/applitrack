import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingNavbar = () => {
  return (
    <nav className=" bg-white border-b border-zinc-300">
      <div className="flex items-center justify-between p-5 container">
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
