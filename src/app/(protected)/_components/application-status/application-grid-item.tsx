import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import { cn } from "@/lib/utils";
import { JobApplication } from "@/models/User";
import axios from "axios";
import { FileSliders, SquareArrowUpRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { UnbookmarkButton } from "./unbookmark-button";
import { Button } from "@/components/ui/button";

export const ApplicationGridItem = ({
  application,
}: {
  application: JobApplication;
}) => {
  const { onOpen } = useModalStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const LPA = application.salary / 100000;

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
        "aspect-square h-fit border rounded-md bg-white flex flex-col justify-between p-3",
        application.workType === "Remote" && "bg-transparent"
      )}
      onClick={() => {
        if (isMobile) {
          onOpen("application-details", { application });
        }
      }}
    >
      <div className="space-y-1.5">
        <span className="text-sm md:text-base font-medium text-gray-700 line-clamp-2">
          {application.jobRole}, {application.companyName}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-1 rounded bg-orange-100/30 text-xs text-orange-600 border border-orange-200 ">
            {LPA} LPA
          </span>
          <span
            className={cn(
              "px-2 py-1 rounded bg-blue-100/30 text-xs text-blue-600 border border-blue-200",
              application.workType === "Remote" &&
                "bg-green-100/30 text-green-600 border-green-200"
            )}
          >
            {application.workType === "Remote" ? "Remote" : "In Person"}
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        {!isMobile && prevStep && !application.interviewDate && (
          <button
            className="flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
            onClick={() => {
              handleMoveApplication(application._id as string, prevStep);
            }}
          >
            Move to {prevStep}
          </button>
        )}
        {!isMobile && nextStep && canMoveToNextStep && (
          <button
            className={cn(
              "flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700",
              nextStep === "Got Offer" &&
                "bg-green-100/30 text-green-600 border-green-200"
            )}
            onClick={() => {
              handleMoveApplication(application._id as string, nextStep);
            }}
          >
            Move to {nextStep}
          </button>
        )}
        {isMobile && (
          <button className="px-2 py-1 rounded bg-green-100/30 text-xs text-green-600 border border-green-200">
            {application.jobLocation}, {application.jobCountry}
          </button>
        )}
        {isInterviewScheduled &&
          (application.interviewDate ? (
            <div
              className={cn(
                "px-2 py-1 rounded bg-violet-100/30 text-xs text-violet-600 border border-violet-200"
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
                if (!isMobile) {
                  onOpen("set-interview-date", {
                    applicationId: application._id as string,
                  });
                }
              }}
            >
              Set Date
            </button>
          ))}
        {!isMobile && (
          <div className="flex w-full gap-1">
            <Link
              href={application.jobPostLink}
              className="text-gray-400 p-1 z-10 hover:text-blue-500 transition flex-1 flex justify-center rounded border"
            >
              <SquareArrowUpRight className="size-4" />
            </Link>
            <button
              className="text-gray-400 p-1 z-10 hover:text-blue-500 transition flex-1 flex justify-center rounded border"
              onClick={() => {
                onOpen("application-details", { application });
              }}
            >
              <FileSliders className="size-4" />
            </button>
            <UnbookmarkButton
              className="flex-1 justify-center flex rounded border"
              applicationId={application._id as string}
            />
          </div>
        )}
      </div>
    </div>
  );
};
