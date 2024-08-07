import ShinyButton from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ProductFeatures = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-32 xl w-full mt-20">
      {/* TRACK FUNCTIONALITIES */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-3 w-full lg:max-w-md">
          <span className="text-lg font-semibold text-orange-500">Track</span>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            Stay Organized and On Track
          </h2>
          <span className="text-gray-500/80 text-base lg:text-lg">
            You can easily keep tabs on all your job applications in one place.
            Our intuitive dashboard lets you see at a glance where you stand
            with each potential employer, helping you stay organized and focused
            on your job hunt.
          </span>
          <Button className="w-max" asChild>
            <Link href={"/sign-up"}>Explore Feature</Link>
          </Button>
        </div>
        <div className="flex-1">
          <video
            src="/videos/track-feature.mp4"
            autoPlay
            muted
            loop
            className="rounded-xl w-full"
          />
        </div>
      </div>
      {/* INTERVIEW REMINDERS FUNCTIONALITY */}
      <div className="flex flex-col lg:flex-row-reverse gap-10">
        <div className="flex flex-col gap-3 w-full lg:max-w-md">
          <span className="text-lg font-semibold text-orange-500">
            Reminders
          </span>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            Never Miss an Important Date
          </h2>
          <span className="text-gray-500/80 text-base lg:text-lg">
            Set interview dates within the app, and we&apos;ll send you a
            reminder email one day before the scheduled interview. This way, you
            can prepare in advance and show up confident and ready to impress.
          </span>
          <Button className="w-max" asChild>
            <Link href={"/sign-up"}>Explore Feature</Link>
          </Button>
        </div>
        <div className="flex-1">
          <video
            src="/videos/reminder-feature.mp4"
            autoPlay
            muted
            loop
            className="rounded-xl w-full"
          />
        </div>
      </div>
      {/* DOCUMENT MANAGEMENT FUNCTIONALITY */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col gap-3 w-full lg:max-w-md">
          <span className="text-lg font-semibold text-orange-500">
            Document Management
          </span>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            Keep Your Important Documents Handy
          </h2>
          <span className="text-gray-500/80 text-base lg:text-lg">
            No more digging through folders to find your CV or cover letter.
            Easily access and attach your documents when applying for jobs,
            ensuring you always send the right information to potential
            employers.
          </span>
          <Button className="w-max" asChild>
            <Link href={"/sign-up"}>Explore Feature</Link>
          </Button>
        </div>
        <div className="flex-1">
          <video
            src="/videos/document-management-feature.mp4"
            autoPlay
            muted
            loop
            className="rounded-xl w-full"
          />
        </div>
      </div>
    </div>
  );
};
