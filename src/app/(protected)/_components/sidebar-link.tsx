"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

export const SidebarLink = ({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex px-3 py-1.5 rounded-md w-full items-center gap-3 text-sm text-gray-500 hover:bg-dashboardbg transition",
        isActive && "bg-dashboardbg text-gray-800"
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
};
