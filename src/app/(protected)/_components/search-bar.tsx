"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (query.length > 0) {
        router.push(`?view=${view}&searchQuery=${query}`);
      } else {
        router.push(`?view=${view}`);
      }
    }
  };

  return (
    <div className="flex rounded-md w-full items-center text-sm border px-3 py-1.5 bg-dashboardbg text-gray-500">
      <Search className="size-4 mr-1" />
      <Input
        className="h-max flex-1 p-0 px-1 border-none bg-transparent placeholder:text-gray-500"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
