"use client";

import { Button } from "@/components/ui/button";
import { JobApplication } from "@/models/User";
import { Divide, Info, Loader2, LucideIcon, Plus } from "lucide-react";
import { ApplicationListItem } from "./application-list-item";
import { cn } from "@/lib/utils";
import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import { ListItemDropdown } from "./list-item-dropdown";
import { ApplicationGridItem } from "./application-grid-item";

export const ApplicationGroup = ({
  status,
  icon: Icon,
  loading = true,
  applications: app,
  view,
  isMobile,
}: {
  status: "Bookmarked" | "Applied" | "Interview Scheduled" | "Got Offer";
  icon: LucideIcon;
  loading: boolean;
  applications: JobApplication[];
  view: string;
  isMobile: boolean;
}) => {
  const applications = app
    .filter(
      (application: JobApplication) => application.applicationStatus === status
    )
    .reverse();

  const { onOpen } = useModalStore();
  const { overlappingInterviews } = useApplicationStore();

  const showAddButton = status === "Bookmarked" || status === "Applied";

  const showOverlappingInterviewsAlert =
    overlappingInterviews.length > 0 && status === "Interview Scheduled";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 font-medium text-sm text-gray-700">
          <Icon className="size-4" strokeWidth={2.5} />
          {status}
          <div className="rounded border h-5 w-5 aspect-square  flex items-center justify-center">
            <small className="text-gray-400">
              {loading ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                applications.length
              )}
            </small>
          </div>
          {showOverlappingInterviewsAlert && (
            <div className="rounded border flex items-center justify-center gap-1 h-5 w-fit aspect-square md:aspect-auto md:px-2  text-red-500 bg-red-100/30 border-red-200 font-normal">
              <Info className="size-3" />
              <small className="hidden md:block">
                Some interviews have the same date
              </small>{" "}
            </div>
          )}
        </div>
        <div className="flex items-center text-gray-500">
          {showAddButton && (
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => {
                onOpen("new-application", { applicationStatus: status });
              }}
            >
              <Plus className="size-4" />
            </Button>
          )}
          <ListItemDropdown status={status} />
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-5">
          {applications.length === 0 ? (
            <div className="aspect-square h-fit border rounded-lg border-dashed border-gray-300"></div>
          ) : (
            applications.map((application, index) => (
              <ApplicationGridItem key={index} application={application} />
            ))
          )}
        </div>
      ) : (
        <div
          className={cn("flex flex-col w-full", applications.length > 0 && "")}
        >
          {applications.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-lg h-11"></div>
          ) : (
            applications.map((application, index) => (
              <ApplicationListItem
                key={index}
                application={application}
                isLastItem={index === applications.length - 1}
                isFirstItem={index === 0}
                index={index}
                isMobile={isMobile}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
