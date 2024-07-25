"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
import { SetInterviewDateForm } from "../form/set-interview-date-form";

export const SetInterviewDateModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "set-interview-date";

  const { applicationId } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Interview Date</DialogTitle>
          <DialogDescription>
            Please select the date when the interview is scheduled.
          </DialogDescription>
        </DialogHeader>
        <SetInterviewDateForm applicationId={applicationId as string} />
      </DialogContent>
    </Dialog>
  );
};
