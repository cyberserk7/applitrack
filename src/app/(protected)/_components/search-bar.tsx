"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const currentParams = new URLSearchParams(searchParams);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex rounded-md w-full items-center text-sm border px-3 py-1.5 bg-dashboardbg text-gray-500",
        className
      )}
    >
      <Search className="size-4 mr-1" />
      <Input
        className="h-max flex-1 p-0 px-1 border-none bg-transparent placeholder:text-gray-500"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.length > 0) {
            currentParams.set("searchQuery", e.target.value);
            router.replace(`${pathname}?${currentParams.toString()}`);
          } else {
            currentParams.delete("searchQuery");
            router.replace(`${pathname}?${currentParams.toString()}`);
          }
        }}
      />
    </div>
  );
};
