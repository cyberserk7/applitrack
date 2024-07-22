"use client";

import { UserButton } from "./user-btn";
import {
  BriefcaseBusiness,
  CircleHelp,
  FileText,
  Grid2X2,
  Home,
  LogOut,
  LucideIcon,
  MessageSquareMore,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { SidebarLink } from "./sidebar-link";

interface SidebarNavLinkProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SidebarNavLinks: SidebarNavLinkProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Grid2X2,
  },
  {
    label: "Manage Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    label: "Search Jobs",
    href: "/dashboard/search-jobs",
    icon: BriefcaseBusiness,
  },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col gap-5 w-full md:w-[250px] h-full bg-white overflow-y-auto border-r ">
      <div className="py-2 xl:py-3 px-5 w-full">
        <UserButton />
      </div>
      <div className="flex flex-col px-5">
        <SidebarItem icon={Search} label={"Search"} type="search" />
        <SidebarItem icon={Settings} label="Settings" type="settings" />
        <SidebarItem
          icon={MessageSquareMore}
          label="Feedback"
          type="feedback"
        />
        <SidebarItem icon={Trash} label="Trash" type="trash" />
        <SidebarItem
          icon={PlusCircle}
          label="New Application"
          type="new-application"
        />
      </div>
      <div className="w-full h-px border-b" />
      <div className="flex flex-col px-5">
        {SidebarNavLinks.map((link, index) => (
          <SidebarLink
            key={index}
            label={link.label}
            href={link.href}
            icon={link.icon}
          />
        ))}
      </div>
      <div className="w-full px-5 flex flex-col flex-1 justify-end py-2 xl:py-3">
        <SidebarItem icon={CircleHelp} label="Support" type="support" />
      </div>
    </aside>
  );
};
