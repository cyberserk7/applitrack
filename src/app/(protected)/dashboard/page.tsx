"use client";

import { useApplicationStore } from "@/hooks/use-zustand";
import { DashboardApplications } from "../_components/dashboard-applications";
import { Suspense } from "react";

export default function Dashboard() {
  const { applications, loading } = useApplicationStore();
  return (
    <Suspense>
      <DashboardApplications applications={applications} loading={loading} />
    </Suspense>
  );
}
