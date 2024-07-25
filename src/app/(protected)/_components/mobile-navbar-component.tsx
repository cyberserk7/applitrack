"use client";

import {
  CircleHelp,
  Menu,
  MessageSquareMore,
  PlusCircle,
  Settings,
  Trash,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Suspense, useEffect, useState } from "react";
import { SearchBar } from "./search-bar";
import { UserButton } from "./user-btn";
import { SidebarItem } from "./sidebar-item";
import { SidebarNavLinks } from "./sidebar";
import { SidebarLink } from "./sidebar-link";
import { usePathname } from "next/navigation";

export const MobileNavbarComponent = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <button className="p-2 rounded-md" onClick={() => setOpen(true)}>
          <Menu className="size-4" />
        </button>
        <Suspense>
          <SearchBar className="" />
        </Suspense>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"} className="p-0 py-5">
          <aside className="flex flex-col gap-5 w-full md:w-[250px] h-full bg-white overflow-y-auto border-r ">
            <div className="py-2 xl:py-3 px-5 w-full">
              <UserButton />
            </div>
            <div className="px-5 space-y-3">
              <div className="flex flex-col ">
                <SidebarItem icon={Settings} label="Settings" type="settings" />
                <SidebarItem icon={Trash} label="Trash" type="trash" />
                <SidebarItem
                  icon={PlusCircle}
                  label="New Application"
                  type="new-application"
                />
              </div>
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
              <SidebarItem
                icon={MessageSquareMore}
                label="Feedback"
                type="feedback"
              />
            </div>
          </aside>
        </SheetContent>
      </Sheet>
    </>
  );
};
