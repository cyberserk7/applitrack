"use client";

import { useModalStore } from "@/hooks/use-zustand";
import { LucideIcon } from "lucide-react";

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
    | "feedback"
    | "settings"
    | "search"
    | "support";
}) => {
  const { onOpen } = useModalStore();
  return (
    <button
      className="flex px-3 py-1.5 rounded-md w-full items-center gap-3 text-sm text-gray-500 hover:bg-dashboardbg transition"
      onClick={() => onOpen(type)}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
};
