"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Switch } from "../ui/switch";

export const SettingsModal = () => {
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "settings";
  const { data: session } = useSession();

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-md border px-3 py-2 text-sm flex items-center justify-between">
          <div className="flex gap-1.5 items-center">
            Dark Mode{" "}
            <span className="text-xs bg-zinc-200 px-2 py-1 rounded text-zinc-500">
              Coming Soon
            </span>
          </div>
          <Switch checked={false} onChange={() => {}} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
