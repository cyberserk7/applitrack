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
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { UnbookmarkButton } from "./unbookmark-button";

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

  const {
    applications,
    setApplications,
    refreshApplications,
    refreshOverlappingInterviews,
  } = useApplicationStore();

  const handleMoveApplication = async (
    applicationId: string,
    status: string
  ) => {
    const updatedApplications = applications.map(
      (application: JobApplication) => {
        if (application._id === applicationId) {
          return { ...application, applicationStatus: status };
        }
        return application;
      }
    );
    setApplications(updatedApplications as JobApplication[]);
    try {
      await axios.patch(
        `/api/move-application?applicationId=${applicationId}&status=${status}`
      );
    } catch (error) {
      toast.error("Failed to move application");
    } finally {
      refreshApplications();
      refreshOverlappingInterviews();
    }
  };

  let nextStep: string | undefined = undefined;
  let prevStep: string | undefined = undefined;

  switch (application.applicationStatus) {
    case "Bookmarked":
      nextStep = "Applied";
      break;
    case "Applied":
      nextStep = "Interview Scheduled";
      prevStep = "Bookmarked";
      break;
    case "Interview Scheduled":
      nextStep = "Got Offer";
      prevStep = "Applied";
      break;
    case "Got Offer":
      break;
    default:
      break;
  }

  const isInterviewScheduled =
    application.applicationStatus === "Interview Scheduled";

  let daysUntilInterview = 0;
  if (application.interviewDate) {
    const today = new Date();
    const interviewDate = new Date(application.interviewDate);
    daysUntilInterview = Math.ceil(
      (interviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  let canMoveToNextStep = true;
  if (
    application.applicationStatus === "Interview Scheduled" &&
    (daysUntilInterview > 0 || !application.interviewDate)
  ) {
    canMoveToNextStep = false;
  }

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
        <span className="px-2 py-1 rounded bg-orange-100/30 text-xs text-orange-600 border border-orange-200 ">
          {LPA} LPA
        </span>
        <span className="flex-1 text-sm font-medium line-clamp-1">
          {application.jobRole}, {application.companyName}{" "}
        </span>
        {isInterviewScheduled &&
          (application.interviewDate ? (
            <div
              className={cn(
                "px-2 py-1 rounded bg-purple-100/30 text-xs text-purple-600 border border-purple-200",
                daysUntilInterview <= 0 &&
                  "bg-green-100/30 text-green-600  border-green-200"
              )}
            >
              {daysUntilInterview > 0
                ? `Scheduled in ${daysUntilInterview} days`
                : "Interview done"}
            </div>
          ) : (
            <button
              className="px-2 py-1 rounded bg-red-100/30 text-xs text-red-600 border border-red-200"
              onClick={() => {
                onOpen("set-interview-date", {
                  application,
                });
              }}
            >
              Set Date
            </button>
          ))}
      </div>
      <div className="hidden lg:flex items-center gap-5">
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          {isRemote ? (
            <span className="px-2 py-1 rounded bg-green-100/30 text-xs text-green-600 border border-green-200">
              Remote
            </span>
          ) : (
            <span className="px-2 py-1 rounded bg-blue-100/30 text-xs text-blue-600 border border-blue-200">
              {application.jobLocation}, {application.jobCountry}
            </span>
          )}
          {prevStep && !application.interviewDate && (
            <button
              className="flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
              onClick={() => {
                handleMoveApplication(application._id as string, prevStep);
              }}
            >
              Move to {prevStep}
            </button>
          )}
          {nextStep && canMoveToNextStep && (
            <button
              className={cn(
                "flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
              )}
              onClick={() => {
                handleMoveApplication(application._id as string, nextStep);
              }}
            >
              Move to {nextStep}
            </button>
          )}
          {application.applicationStatus === "Interview Scheduled" &&
            application.interviewDate &&
            daysUntilInterview <= 0 && (
              <button
                className={cn(
                  "px-2 py-1 rounded bg-green-100/30 text-xs text-green-600 border border-green-200"
                )}
                onClick={() => {
                  handleMoveApplication(application._id as string, "Got Offer");
                }}
              >
                Got Offer
              </button>
            )}
        </div>
        <div className="flex">
          <Link
            href={application.jobPostLink}
            className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
          >
            <SquareArrowUpRight className="size-4" />
          </Link>
          <button
            className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
            onClick={() => {
              onOpen("application-details", { application });
            }}
          >
            <FileSliders className="size-4" />
          </button>
          <UnbookmarkButton applicationId={application._id as string} />
        </div>
      </div>
      <Button className="lg:hidden text-gray-400 px-1" variant={"ghost"}>
        <SquareArrowOutUpRight className="size-4" />
      </Button>
    </div>
  );
};
