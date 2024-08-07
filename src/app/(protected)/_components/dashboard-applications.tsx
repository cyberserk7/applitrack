"use client";

import { JobApplication } from "@/models/User";
import {
  Bookmark,
  CalendarPlus2,
  CircleCheck,
  CircleFadingPlus,
} from "lucide-react";
import { ApplicationGroup } from "../_components/application-status/application-group";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

export const DashboardApplications = ({
  loading,
  applications: app,
}: {
  loading: boolean;
  applications: JobApplication[];
}) => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const searchQuery = searchParams.get("searchQuery");
  const isMobile = useMediaQuery("(max-width: 768px)");

  let applications: JobApplication[] = app;

  if (searchQuery) {
    applications = applications.filter(
      (app: JobApplication) =>
        app.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (searchQuery && applications.length === 0) {
    return (
      <div className=" w-full flex items-center justify-center h-40">
        <span className="text-gray-400">No results found</span>
      </div>
    );
  }

  return (
    <div className="h-full p-3 xl:p-10 space-y-5 w-full">
      <ApplicationGroup
        status="Bookmarked"
        icon={Bookmark}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
        filter={searchQuery ? true : false}
      />
      <ApplicationGroup
        status="Applied"
        icon={CircleFadingPlus}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
        filter={searchQuery ? true : false}
      />
      <ApplicationGroup
        status="Interview Scheduled"
        icon={CalendarPlus2}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
        filter={searchQuery ? true : false}
      />
      <ApplicationGroup
        status="Got Offer"
        icon={CircleCheck}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
        filter={searchQuery ? true : false}
      />
    </div>
  );
};
