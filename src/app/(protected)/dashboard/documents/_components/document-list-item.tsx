"use client";

import { cn } from "@/lib/utils";
import { DocumentType } from "@/models/Document";
import { FileDown, View } from "lucide-react";
import { DeleteDocumentButton } from "./delete-document-button";
import { useModalStore } from "@/hooks/use-zustand";
import Link from "next/link";

export const DocumentListItem = ({
  document: doc,
  isLastItem,
  isFirstItem,
  index,
}: {
  document: DocumentType;
  isLastItem: boolean;
  isFirstItem: boolean;
  index: number;
}) => {
  const { onOpen } = useModalStore();

  return (
    <div
      className={cn(
        "h-12 px-2.5 md:px-5 flex items-center bg-white border border-t-0 text-gray-700 text-sm justify-between",
        isLastItem && "rounded-b-lg",
        isFirstItem && "rounded-t-lg border-t"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 font-medium text-sm text-gray-700">
          <span className="text-gray-600">{doc.title}</span>
          <div className="flex items-center gap-1">
            <button
              className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
              onClick={() => {
                onOpen("view-document", {
                  document: doc,
                });
              }}
            >
              <View className="size-4" />
            </button>
            <Link
              className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
              href={doc.url}
              target="_blank"
            >
              <FileDown className="size-4" />
            </Link>
          </div>
        </div>
        <div className="flex">
          <DeleteDocumentButton documentId={doc._id as string} url={doc.url} />
        </div>
      </div>
    </div>
  );
};
