"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
import { DocumentUploadForm } from "../form/document/document-upload-form";

export const DocumentUploadModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "document-upload";

  const { documentType } = data;

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Upload {documentType === "cv" ? "CV" : "Cover Letter"}
            </DialogTitle>
            <DialogDescription>
              {documentType === "cv"
                ? "Resume / CV is a document that explains your skills and experiences"
                : "Cover Letter is a document that explains your motivation and goals"}
            </DialogDescription>
          </DialogHeader>
          <DocumentUploadForm type={documentType!} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
