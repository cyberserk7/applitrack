"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
// Core viewer
import { Viewer } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create new plugin instance

export const ViewDocumentModal = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { isOpen, onClose, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "view-document";

  const { document } = data;
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full -translate-y-1/2">
        <iframe src={document?.url} className="w-full h-full" />
      </DialogContent>
    </Dialog>
  );
};
