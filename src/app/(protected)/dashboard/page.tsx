"use client";

import { useApplicationStore } from "@/hooks/use-zustand";
import { DashboardApplications } from "../_components/dashboard-applications";

export default function Dashboard() {
  const { applications, loading } = useApplicationStore();
  return (
    <DashboardApplications applications={applications} loading={loading} />
  );
}
