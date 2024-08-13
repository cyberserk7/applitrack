"use client";

import { AddApplicationModal } from "@/components/modals/add-application-modal";
import { ApplicationDetailsModal } from "@/components/modals/application-details-modal";
import { DocumentUploadModal } from "@/components/modals/document-upload-modal";
import { EditApplicationModal } from "@/components/modals/edit-application-modal";
import { FeedbackModal } from "@/components/modals/feedback-modal";
import { SetInterviewDateModal } from "@/components/modals/set-interview-date-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { SupportModal } from "@/components/modals/support-modal";
import TrashCommandModal from "@/components/modals/trash-command-modal";
import { ViewDocumentModal } from "@/components/modals/view-document-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddApplicationModal />
      <ApplicationDetailsModal />
      <TrashCommandModal />
      <SetInterviewDateModal />
      <SettingsModal />
      <DocumentUploadModal />
      <ViewDocumentModal />
      <SupportModal />
      <FeedbackModal />
      <EditApplicationModal />
    </>
  );
};
