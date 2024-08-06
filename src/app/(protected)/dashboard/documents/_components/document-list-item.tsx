import { cn } from "@/lib/utils";
import { DocumentType } from "@/models/Document";
import { NotepadText } from "lucide-react";

export const DocumentListItem = ({
  document,
  isLastItem,
  isFirstItem,
  index,
}: {
  document: DocumentType;
  isLastItem: boolean;
  isFirstItem: boolean;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "h-12 px-2.5 md:px-5 flex items-center bg-white border border-t-0 text-gray-700 text-sm justify-between",
        isLastItem && "rounded-b-lg",
        isFirstItem && "rounded-t-lg border-t"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 font-medium text-sm text-gray-700">
          {document.title}
        </div>
      </div>
    </div>
  );
};
