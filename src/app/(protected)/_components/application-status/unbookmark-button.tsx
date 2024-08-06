import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApplicationStore } from "@/hooks/use-zustand";
import { cn } from "@/lib/utils";
import { JobApplication } from "@/models/User";
import axios from "axios";
import { BookmarkMinus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const UnbookmarkButton = ({
  className,
  applicationId,
}: {
  className?: string;
  applicationId: string;
}) => {
  const [open, setOpen] = useState(false);
  const {
    applications,
    setApplications,
    refreshApplications,
    setTrashCount,
    trashCount,
    refreshOverlappingInterviews,
  } = useApplicationStore();

  const handleArchiveApplication = async (applicationId: string) => {
    const updatedApplications = applications.filter(
      (application: JobApplication) => application._id !== applicationId
    );
    setApplications(updatedApplications);
    setTrashCount(trashCount + 1);
    try {
      await axios.patch(
        `/api/archive-application?applicationId=${applicationId}`
      );
      toast.success("Application added to trash");
    } catch (error) {
      toast.error("Failed to delete application");
    } finally {
      refreshApplications();
      refreshOverlappingInterviews();
    }
  };
  return (
    <>
      <button
        className={cn(
          "text-gray-400 p-1 z-10 hover:text-red-500 transition",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <BookmarkMinus className="size-4" />
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Application</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove this application from your list. You can
              recover it from the trash section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleArchiveApplication(applicationId)}
            >
              Remove Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
