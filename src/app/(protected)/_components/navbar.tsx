"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Columns2,
  ListFilter,
  ListIcon,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsView = searchParams.get("view");
  const router = useRouter();

  useEffect(() => {
    if (!paramsView || (paramsView !== "grid" && paramsView !== "list")) {
      router.push("?view=list");
    }
  }, [paramsView, pathname]);

  return (
    <div className="w-full px-5 xl:px-10 py-2 xl:py-3 border-b flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Button
          size={"sm"}
          variant="ghost"
          className="border text-gray-500  font-normal px-2.5 shadow-sm"
        >
          <ListFilter className="mr-2 size-4" />
          Filter
        </Button>
      </div>
      <div className="flex items-center gap-2 h-full">
        <Button
          size={"sm"}
          variant={"ghost"}
          className="border font-normal px-2.5 text-gray-700 shadow-sm"
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
              router.replace("/dashboard?view=grid");
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
              router.replace("/dashboard?view=list");
            }}
          >
            <ListIcon strokeWidth={2} className="size-4" />
          </button>
        </div>
        <button className="hidden md:block p-2">
          <SlidersHorizontal className="size-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
