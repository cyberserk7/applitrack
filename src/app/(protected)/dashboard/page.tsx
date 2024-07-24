"use client";

import {
  Bookmark,
  CalendarPlus2,
  CircleCheck,
  CircleFadingPlus,
} from "lucide-react";
import { ApplicationGroup } from "../_components/application-status/application-group";
import { Suspense } from "react";
import { useApplicationStore } from "@/hooks/use-zustand";

export default function Dashboard() {
  const { applications, loading } = useApplicationStore();

  return (
    <div className="h-full p-5 xl:p-10 space-y-5 w-full">
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
        <ApplicationGroup
          status="Got Offer"
          icon={CircleCheck}
          loading={loading}
          applications={applications}
        />
      </Suspense>
    </div>
  );
}
