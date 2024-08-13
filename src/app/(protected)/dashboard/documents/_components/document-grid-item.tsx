import { useModalStore } from "@/hooks/use-zustand";
import { DocumentType } from "@/models/Document";
import { FileDown, View } from "lucide-react";
import Link from "next/link";
import { DeleteDocumentButton } from "./delete-document-button";

export const DocumentGridItem = ({ document }: { document: DocumentType }) => {
  const { onOpen } = useModalStore();

  return (
    <div className="bg-white border rounded-lg h-fit aspect-square">
      <div className="h-2/3 w-full flex flex-col items-center justify-center p-2 text-center">
        <span className="text-sm text-gray-500">{document.title}</span>
      </div>
      <div className="h-1/3 w-full flex items-center justify-between p-2 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 font-medium text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <button
                className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
                onClick={() => {
                  onOpen("view-document", {
                    document,
                  });
                }}
              >
                <View className="size-4" />
              </button>
              <Link
                className="text-gray-400 p-1 z-10 hover:text-blue-500 transition"
                href={document.url}
                target="_blank"
              >
                <FileDown className="size-4" />
              </Link>
            </div>
          </div>
          <div className="flex">
            <DeleteDocumentButton
              documentId={document._id as string}
              url={document.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
