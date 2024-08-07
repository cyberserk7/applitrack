"use client";

import { Button } from "@/components/ui/button";
import { Check, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const applicationFilterOptions = [
  {
    label: "Bookmarked",
    value: "Bookmarked",
  },
  {
    label: "Applied",
    value: "Applied",
  },
  {
    label: "Interview Scheduled",
    value: "Interview Scheduled",
  },
  {
    label: "Got Offer",
    value: "Got Offer",
  },
];

const documentFilterOptions = [
  {
    label: "Resume / CV",
    value: "cv",
  },
  {
    label: "Cover Letter",
    value: "cover-letter",
  },
];

export const FilterButton = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParams = new URLSearchParams(searchParams);

  const handleClick = (filter: string) => {
    const currentParams = new URLSearchParams(searchParams);
    if (currentParams.get("filterQuery") === filter) {
      currentParams.delete("filterQuery");
      router.replace(`${pathname}?${currentParams.toString()}`);
      return;
    }
    currentParams.set("filterQuery", filter);
    router.replace(`${pathname}?${currentParams.toString()}`);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Button
        size={"sm"}
        variant="ghost"
        className="border text-gray-500  font-normal px-2.5 shadow-sm"
      >
        <ListFilter className="mr-2 size-4" />
        Filter
      </Button>
    );

  const isApplicationsPage = pathname === "/dashboard";
  const isDocumentsPage = pathname === "/dashboard/documents";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="select-none w-full">
        <Button
          size={"sm"}
          variant="ghost"
          className="border text-gray-500  font-normal px-2.5 shadow-sm"
        >
          <ListFilter className="mr-2 size-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-700" align="start">
        {isApplicationsPage &&
          applicationFilterOptions.map((option, index) => {
            const isActive = currentParams.get("filterQuery") === option.value;
            return (
              <div key={index}>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer text-sm text-gray-500 hover:text-gray-700",
                    isActive && "text-gray-700 font-medium"
                  )}
                  onClick={() => {
                    handleClick(option.value);
                  }}
                >
                  {isActive && <Check className="mr-2 size-4" />}
                  {option.label}
                </DropdownMenuItem>
                {index !== applicationFilterOptions.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </div>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
