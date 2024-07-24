"use client";

import { Button } from "@/components/ui/button";
import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import { cn } from "@/lib/utils";
import { JobApplication } from "@/models/User";
import axios from "axios";
import {
  FileSliders,
  SquareArrowOutUpRight,
  SquareArrowUpRight,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const ApplicationListItem = ({
  application,
  isLastItem,
  isFirstItem,
  index,
  isMobile,
}: {
  application: JobApplication;
  isLastItem: boolean;
  isFirstItem: boolean;
  index: number;
  isMobile: boolean;
}) => {
  const LPA = application.salary / 100000;
  const isRemote = application.workType === "Remote";
  const { onOpen } = useModalStore();

  const { applications, setApplications, refreshApplications } =
    useApplicationStore();
  const handleDeleteApplication = async (applicationId: string) => {
    const updatedApplications = applications.filter(
      (application: JobApplication) => application._id !== applicationId
    );
    setApplications(updatedApplications);
    try {
      await axios.patch(
        `/api/archive-application?applicationId=${applicationId}`
      );
      toast.success("Application added to trash");
    } catch (error) {
      toast.error("Failed to delete application");
      refreshApplications();
    }
  };

  return (
    <div
      className={cn(
        "h-12 px-2.5 md:px-5 flex items-center bg-white border border-t-0 text-gray-700 text-sm justify-between",
        isLastItem && "rounded-b-lg",
        isFirstItem && "rounded-t-lg border-t",
        application.workType === "Remote" && "bg-transparent"
      )}
      onClick={() => {
        if (isMobile) {
          onOpen("application-details", { application });
        }
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 hidden md:block">
          {application.applicationStatus[0]}A-{index + 1}
        </span>
        <span className="px-2 py-1 rounded bg-orange-100/30 text-xs text-orange-600 border border-orange-200">
          {LPA} LPA
        </span>
        <span className="text-sm font-medium line-clamp-1">
          {application.jobRole}, {application.companyName}{" "}
        </span>
      </div>
      <div className="hidden lg:flex items-center gap-5">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          {isRemote ? (
            <span className="px-2 py-1 rounded bg-green-100/30 text-xs text-green-600 border border-green-200">
              Remote
            </span>
          ) : (
            <span className="px-2 py-1 rounded bg-blue-100/30 text-xs text-blue-600 border border-blue-200">
              {application.jobLocation}, {application.jobCountry}
            </span>
          )}
        </div>
        <div className="flex">
          <Link
            href={application.jobPostLink}
            className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
          >
            <SquareArrowUpRight className="size-4" />
          </Link>
          <button className="text-gray-400 p-1 z-10 hover:text-blue-500 transition">
            <FileSliders className="size-4" />
          </button>
          <button
            className="text-gray-400 p-1 z-10 hover:text-red-500 transition"
            onClick={() => handleDeleteApplication(application._id as string)}
          >
            <Trash className="size-4" />
          </button>
        </div>
      </div>
      <Button className="lg:hidden text-gray-400 px-1" variant={"ghost"}>
        <SquareArrowOutUpRight className="size-4" />
      </Button>
    </div>
  );
};
