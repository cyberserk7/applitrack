import Ripple from "@/components/magicui/ripple";
import Image from "next/image";
import { Link } from "next-view-transitions";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 flex flex-col gap-10 py-10 md:py-0 justify-start md:justify-center items-center min-h-full w-full bg-gray-200 relative">
      <Link href={"/"} className="flex items-center gap-1 z-10">
        <Image
          src={"/logo-black.png"}
          height={500}
          width={500}
          alt="logo"
          className="h-7 w-fit"
        />
        <h1 className="font-semibold text-xl">AppliTrack</h1>
      </Link>
      {children}
    </div>
  );
}
