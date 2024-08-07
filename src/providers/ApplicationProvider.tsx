"use client";

import { useApplicationStore, useDocumentStore } from "@/hooks/use-zustand";
import { useEffect } from "react";

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { fetchApplications, refreshOverlappingInterviews } =
    useApplicationStore();

  const { fetchDocuments } = useDocumentStore();

  useEffect(() => {
    fetchApplications();
    refreshOverlappingInterviews();
    fetchDocuments();
  }, []);

  return <>{children}</>;
};
