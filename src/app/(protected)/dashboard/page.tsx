"use client";

import { Bookmark, CalendarPlus2, CircleFadingPlus } from "lucide-react";
import { ApplicationGroup } from "../_components/application-status/application-group";
import { Suspense, useEffect, useState } from "react";
import { JobApplication } from "@/models/User";
import { useApplicationStore } from "@/hooks/use-zustand";

export default function Dashboard() {
  const { applications, loading, fetchApplications } = useApplicationStore();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="h-full p-5 xl:p-10 space-y-5">
      <Suspense>
        <ApplicationGroup
          status="Bookmarked"
          icon={Bookmark}
          loading={loading}
          applications={applications}
        />
        <ApplicationGroup
          status="Applied"
          icon={CircleFadingPlus}
          loading={loading}
          applications={applications}
        />
        <ApplicationGroup
          status="Interview Scheduled"
          icon={CalendarPlus2}
          loading={loading}
          applications={applications}
        />
      </Suspense>
    </div>
  );
}
