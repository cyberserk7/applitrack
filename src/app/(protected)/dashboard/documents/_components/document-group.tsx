"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-zustand";
import { DocumentType } from "@/models/Document";
import { LucideIcon, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { DocumentListItem } from "./document-list-item";

export const DocumentGroup = ({
  icon: Icon,
  title,
  type,
  documents: docs,
}: {
  icon: LucideIcon;
  title: string;
  type: string;
  documents: DocumentType[];
}) => {
  const { onOpen } = useModalStore();

  const documents = docs.filter((doc: DocumentType) => doc.type === type);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 font-medium text-sm text-gray-700">
          <Icon className="size-4" strokeWidth={2.5} />
          {title}
        </div>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={() => {
            onOpen("document-upload", {
              documentType: type,
            });
          }}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="flex flex-col">
        {documents.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-lg h-11"></div>
        ) : (
          documents.map((document, index) => (
            <DocumentListItem
              key={index}
              document={document}
              isLastItem={index === documents.length - 1}
              isFirstItem={index === 0}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};
