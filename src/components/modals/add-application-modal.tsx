"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
import { AddApplicationForm } from "../form/dashboard/add-application-form";

export const AddApplicationModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "new-application";

  const { applicationStatus } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="-translate-y-[50%]">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Add a job application you&apos;d like to track.
          </DialogDescription>
        </DialogHeader>
        <AddApplicationForm status={applicationStatus} />
      </DialogContent>
    </Dialog>
  );
};
