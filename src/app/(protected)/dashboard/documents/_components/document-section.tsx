"use client";

import { Mailbox, NotepadText } from "lucide-react";
import { DocumentGroup } from "./document-group";
import { DocumentType } from "@/models/Document";
import { useSearchParams } from "next/navigation";

export const DocumentSection = ({
  documents: docs,
  loading,
}: {
  documents: DocumentType[];
  loading: boolean;
}) => {
  let documents: DocumentType[] = docs;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const view = searchParams.get("view");

  if (searchQuery) {
    documents = documents.filter((doc: DocumentType) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (searchQuery && documents.length === 0) {
    return (
      <div className=" w-full flex items-center justify-center h-40">
        <span className="text-gray-400">No results found</span>
      </div>
    );
  }

  return (
    <>
      <DocumentGroup
        icon={NotepadText}
        title="Resume / CV"
        type="cv"
        documents={documents}
        loading={loading}
        view={view!}
        filter={searchQuery ? true : false}
      />

      <DocumentGroup
        icon={Mailbox}
        title="Cover Letter"
        type="cover-letter"
        documents={documents}
        loading={loading}
        view={view!}
        filter={searchQuery ? true : false}
      />
    </>
  );
};
