"use client";

import { useApplicationStore } from "@/hooks/use-zustand";
import { useEffect } from "react";

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { fetchApplications } = useApplicationStore();

  useEffect(() => {
    fetchApplications();
  }, []);

  return <>{children}</>;
};
