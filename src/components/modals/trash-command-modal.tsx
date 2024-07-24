"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import { JobApplication } from "@/models/User";
import axios from "axios";
import { toast } from "sonner";

export default function TrashCommandModal() {
  const { onClose, isOpen, type } = useModalStore();
  const {
    archivedApplications,
    applications,
    refreshApplications,
    setArchivedApplications,
    setApplications,
    setTrashCount,
  } = useApplicationStore();

  const isModalOpen = isOpen && type === "trash";

  const handleRestore = async (applicationId: string) => {
    const updatedArchivedApplications = archivedApplications.filter(
      (app: JobApplication) => app._id!.toString() !== applicationId
    );
    setArchivedApplications(updatedArchivedApplications as JobApplication[]);

    const application = archivedApplications.find(
      (app: JobApplication) => app._id!.toString() === applicationId
    );

    const updatedApplications = [
      ...applications,
      application as JobApplication,
    ];
    setApplications(updatedApplications as JobApplication[]);

    setTrashCount(updatedArchivedApplications.length);

    try {
      await axios.patch(
        `/api/restore-application?applicationId=${applicationId}`
      );
      toast.success("Application restored successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to retore application");
    } finally {
      refreshApplications();
    }
  };

  return (
    <CommandDialog open={isModalOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search for a deleted application..." />
      <CommandList className="overflow-y-auto">
        <CommandGroup heading="Deleted Applications" className="">
          {archivedApplications.map((app, index) => {
            return (
              <CommandItem
                key={index}
                className="flex items-center justify-between text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm line-clamp-1">
                    {app.jobRole}, {app.companyName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestore(app._id as string)}
                    className="border rounded px-2 py-1 text-xs border-blue-300 bg-blue-100/20 text-blue-600"
                  >
                    Restore
                  </button>
                  <button className="border rounded px-2 py-1 text-xs border-red-300 bg-red-100/20 text-red-600">
                    Delete
                  </button>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
    </CommandDialog>
  );
}