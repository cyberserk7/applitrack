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

export const ApplicationDetailsModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "application-details";

  const { application } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Add a job application you&apos;d like to track.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
