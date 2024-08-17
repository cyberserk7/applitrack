import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-0 lg:p-5 h-full bg-dashboardbg flex items-center justify-center">
      {/* <Link href={"/"} className="flex items-center gap-1 z-10">
        <Image
          src={"/logo-black.png"}
          height={500}
          width={500}
          alt="logo"
          className="h-7 w-fit"
        />
        <h1 className="font-semibold text-xl">AppliTrack</h1>
      </Link> */}
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
