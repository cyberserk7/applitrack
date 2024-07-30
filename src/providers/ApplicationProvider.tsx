"use client";

import { useApplicationStore } from "@/hooks/use-zustand";
import { useEffect } from "react";

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { fetchApplications, refreshOverlappingInterviews } =
    useApplicationStore();

  useEffect(() => {
    fetchApplications();
    refreshOverlappingInterviews();
  }, []);

  return <>{children}</>;
};
