"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-zustand";
import { DocumentType } from "@/models/Document";
import { Loader2, LucideIcon, Plus } from "lucide-react";
import { DocumentListItem } from "./document-list-item";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentGridItem } from "./document-grid-item";

export const DocumentGroup = ({
  icon: Icon,
  title,
  type,
  documents: docs,
  loading,
  view,
}: {
  icon: LucideIcon;
  title: string;
  type: string;
  documents: DocumentType[];
  loading: boolean;
  view: string;
}) => {
  const { onOpen } = useModalStore();

  const documents = docs.filter((doc: DocumentType) => doc.type === type);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 font-medium text-sm text-gray-700">
          <Icon className="size-4" strokeWidth={2.5} />
          {title}
          {loading && <Loader2 className="size-3 animate-spin text-gray-400" />}
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
      {view === "list" && (
        <div className="flex flex-col">
          {loading ? (
            <div className="rounded-lg h-11 w-full">
              <Skeleton className="w-full h-full bg-dashboardbgdarker"></Skeleton>
            </div>
          ) : documents.length === 0 ? (
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
      )}
      {view === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 md:gap-5">
          {loading && (
            <div className="aspect-square h-fit rounded-lg">
              <Skeleton className="w-full h-full bg-dashboardbgdarker"></Skeleton>
            </div>
          )}
          {!loading && documents.length === 0 ? (
            <div className="aspect-square h-fit border rounded-lg border-dashed border-gray-300"></div>
          ) : (
            !loading &&
            documents.map((document, index) => (
              <DocumentGridItem key={index} document={document} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
