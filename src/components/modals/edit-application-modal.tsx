"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
import { EditAppplicationForm } from "../form/dashboard/edit-application-form";

export const EditApplicationModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "edit-application";

  const { application } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="-translate-y-[50%]">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Edit the details of the selected job application.
          </DialogDescription>
        </DialogHeader>
        <EditAppplicationForm application={application!} />
      </DialogContent>
    </Dialog>
  );
};
