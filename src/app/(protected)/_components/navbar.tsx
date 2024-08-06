"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-zustand";
import { cn } from "@/lib/utils";
import { Columns2, ListFilter, ListIcon, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { MobileNavbarComponent } from "./mobile-navbar-component";

export const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsView = searchParams.get("view");
  const router = useRouter();
  const { onOpen } = useModalStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!paramsView || (paramsView !== "grid" && paramsView !== "list")) {
      router.push("?view=list");
    }
  }, [paramsView, pathname]);

  return (
    <div className="w-full px-3 xl:px-10 py-2 xl:py-3 border-b flex justify-between items-center">
      <div className="flex items-center gap-5">
        {!isMobile ? (
          <Button
            size={"sm"}
            variant="ghost"
            className="border text-gray-500  font-normal px-2.5 shadow-sm"
          >
            <ListFilter className="mr-2 size-4" />
            Filter
          </Button>
        ) : (
          <MobileNavbarComponent />
        )}
      </div>
      <div className="flex items-center gap-2 h-full">
        <Button
          size={"sm"}
          variant={"ghost"}
          className="border font-normal px-2.5 text-gray-700 shadow-sm hidden md:flex"
          onClick={() => onOpen("new-application")}
        >
          <Plus className="size-4 mr-2" />
          New application
        </Button>
        <div className="flex bg-dashboardbgdarker rounded-md h-full p-0.5">
          <button
            className={cn(
              "bg-transparent h-full p-2 text-gray-500",
              paramsView === "grid" &&
                "bg-white shadow-sm rounded-sm text-gray-900"
            )}
            onClick={() => {
              router.replace(`${pathname}?view=grid`);
            }}
          >
            <Columns2 strokeWidth={1.5} className="size-4" />
          </button>
          <button
            className={cn(
              "bg-transparent h-full p-2 text-gray-500",
              paramsView === "list" &&
                "bg-white shadow-sm rounded-sm text-gray-900"
            )}
            onClick={() => {
              router.replace(`${pathname}?view=list`);
            }}
          >
            <ListIcon strokeWidth={2} className="size-4" />
          </button>
        </div>
        {/* <button className="hidden md:block p-2">
          <SlidersHorizontal className="size-4 text-gray-700" />
        </button> */}
      </div>
    </div>
  );
};
