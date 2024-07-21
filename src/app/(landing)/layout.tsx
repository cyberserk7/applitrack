import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { LandingNavbar } from "./_components/landing-navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between relative min-h-full">
      <LandingNavbar />
      <div className="flex-1 px-5 container flex flex-col">{children}</div>
      <GridPattern
        width={50}
        height={50}
        x={0}
        y={0}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] -z-10"
        )}
      />
    </div>
  );
}
