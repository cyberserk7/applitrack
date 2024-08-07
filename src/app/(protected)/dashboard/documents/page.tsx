"use client";

import { Suspense } from "react";
import { DocumentType } from "@/models/Document";
import { DocumentSection } from "./_components/document-section";
import { useDocumentStore } from "@/hooks/use-zustand";

export default function DocumentsPage() {
  const { documents, loading } = useDocumentStore();

  return (
    <div className="h-full p-3 xl:p-10 space-y-5 w-full">
      <Suspense>
        <DocumentSection documents={documents} loading={loading} />
      </Suspense>
    </div>
  );
}
