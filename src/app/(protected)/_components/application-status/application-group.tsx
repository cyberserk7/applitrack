"use client";

import { Button } from "@/components/ui/button";
import { useApplicationStore } from "@/hooks/use-zustand";
import { JobApplication } from "@/models/User";
import axios from "axios";
import { Ellipsis, Loader2, LucideIcon, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ApplicationListItem } from "./application-list-item";
import { cn } from "@/lib/utils";

export const ApplicationGroup = ({
  status,
  icon: Icon,
  applications,
  loading,
}: {
  status: "Bookmarked" | "Applied" | "Interview Scheduled" | "Got Offer";
  icon: LucideIcon;
  applications: JobApplication[];
  loading: boolean;
}) => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const filteredApplications = applications.filter(
    (application: JobApplication) => application.applicationStatus === status
  );

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
                filteredApplications.length
              )}
            </small>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <Button size={"sm"} variant={"ghost"}>
            <Plus className="size-4" />
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            <Ellipsis className="size-4" />
          </Button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-5">
          {filteredApplications.length === 0 ? (
            <div className="aspect-square h-fit border rounded-lg border-dashed border-gray-300"></div>
          ) : (
            <div className=""></div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col w-full",
            filteredApplications.length > 0 && ""
          )}
        >
          {filteredApplications.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-lg h-11"></div>
          ) : (
            filteredApplications.map((application, index) => (
              <ApplicationListItem
                key={index}
                application={application}
                isLastItem={index === filteredApplications.length - 1}
                isFirstItem={index === 0}
                index={index}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
