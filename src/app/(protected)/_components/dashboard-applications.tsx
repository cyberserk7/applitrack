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
        app.workType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicationStatus.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="h-full p-5 xl:p-10 space-y-5 w-full">
      <ApplicationGroup
        status="Bookmarked"
        icon={Bookmark}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
      />
      <ApplicationGroup
        status="Applied"
        icon={CircleFadingPlus}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
      />
      <ApplicationGroup
        status="Interview Scheduled"
        icon={CalendarPlus2}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
      />
      <ApplicationGroup
        status="Got Offer"
        icon={CircleCheck}
        loading={loading}
        applications={applications}
        view={view!}
        isMobile={isMobile}
      />
    </div>
  );
};
