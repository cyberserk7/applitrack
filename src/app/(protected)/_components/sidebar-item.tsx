"use client";

import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import { Loader2, LucideIcon } from "lucide-react";

export const SidebarItem = ({
  icon: Icon,
  label,
  type,
}: {
  icon: LucideIcon;
  label: string;
  type:
    | "new-application"
    | "trash"
    | "settings"
    | "search"
    | "feedback"
    | "support";
}) => {
  const { onOpen } = useModalStore();
  const { trashCount, loading } = useApplicationStore();

  return (
    <button
      className="flex px-3 py-1.5 rounded-md w-full items-center justify-between text-sm text-gray-500 hover:bg-dashboardbg transition"
      onClick={() => onOpen(type)}
    >
      <div className="flex gap-3 items-center">
        <Icon className="size-4" />
        {label}
      </div>
      <div className="text-xs">
        {type === "trash" &&
          (loading ? <Loader2 className="size-3 animate-spin" /> : trashCount)}
      </div>
    </button>
  );
};
