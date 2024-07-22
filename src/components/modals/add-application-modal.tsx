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
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "new-application";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Add a job application you&apos;d like to track.
          </DialogDescription>
        </DialogHeader>
        <AddApplicationForm />
      </DialogContent>
    </Dialog>
  );
};
