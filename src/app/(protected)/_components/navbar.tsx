"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-zustand";
import { cn } from "@/lib/utils";
import { Columns2, ListFilter, ListIcon, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { MobileNavbarComponent } from "./mobile-navbar-component";
import { FilterButton } from "./filter-button";

export const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsView = searchParams.get("view");
  const router = useRouter();
  const { onOpen } = useModalStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const currentParams = new URLSearchParams(searchParams);

  useEffect(() => {
    if (!paramsView || (paramsView !== "grid" && paramsView !== "list")) {
      currentParams.set("view", "list");
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, [paramsView, pathname]);

  return (
    <div className="w-full px-3 xl:px-10 py-2 xl:py-3 border-b flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Suspense>
          {!isMobile ? <FilterButton /> : <MobileNavbarComponent />}
        </Suspense>
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
              currentParams.set("view", "grid");
              router.replace(`${pathname}?${currentParams.toString()}`);
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
              currentParams.set("view", "list");
              router.replace(`${pathname}?${currentParams.toString()}`);
            }}
          >
            <ListIcon strokeWidth={2} className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
