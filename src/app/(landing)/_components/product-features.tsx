"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { motion as m } from "framer-motion";

export const ProductFeatures = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <m.div
      className="flex flex-col gap-10 md:gap-32 xl w-full mt-12 md:mt-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
    >
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
          <Button className="w-max font-normal group" asChild>
            <Link href={"/sign-up"}>
              Explore{" "}
              <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition" />
            </Link>
          </Button>
        </div>
        <div className="flex-1">
          {isMobile ? (
            <Image
              src="/images/track-feature.png"
              height={1000}
              width={1000}
              alt="Track Feature"
              className="rounded-xl border shadow-lg"
            />
          ) : (
            <video
              src="/videos/track-feature.mkv"
              autoPlay
              muted
              loop
              className="rounded-xl border shadow-lg"
              poster="/images/applitrack-track-poster.png"
            />
          )}
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
          <Button className="w-max font-normal group" asChild>
            <Link href={"/sign-up"}>
              Explore{" "}
              <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition" />
            </Link>
          </Button>
        </div>
        <div className="flex-1">
          {isMobile ? (
            <Image
              src="/images/reminder-feature.png"
              height={1000}
              width={1000}
              alt="Reminder Feature"
              className="rounded-xl border shadow-lg"
            />
          ) : (
            <video
              src="/videos/reminder-feature.mkv"
              autoPlay
              muted
              loop
              className="rounded-xl border shadow-lg"
              poster="/images/applitrack-reminder-poster.png"
            />
          )}
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
          <Button className="w-max font-normal group" asChild>
            <Link href={"/sign-up"}>
              Explore{" "}
              <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition" />
            </Link>
          </Button>
        </div>
        <div className="flex-1">
          {isMobile ? (
            <Image
              src="/images/manage-document-feature.png"
              height={1000}
              width={1000}
              alt="Document Management Feature"
              className="rounded-xl border shadow-lg"
            />
          ) : (
            <video
              src="/videos/document-management-feature.mkv"
              autoPlay
              muted
              loop
              className="rounded-xl border shadow-lg"
              poster="/images/applitrack-document-management-poster.png"
            />
          )}
        </div>
      </div>
    </m.div>
  );
};
