"use client";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserButton = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return (
      <Button size={"sm"} variant={"ghost"} className="p-0 w-full">
        <Skeleton className="w-full h-full"></Skeleton>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="select-none w-full">
        <Button
          size={"sm"}
          variant={"outline"}
          className="w-full shadow-sm font-normal text-gray-700 flex justify-between px-3"
        >
          <span className="line-clamp-1">{user?.name}</span>
          <ChevronsUpDown className="size-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-[h-[--radix-dropdown-menu-content-available-height]] text-gray-700">
        <DropdownMenuItem className="text-gray-400">
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          <button className="w-full h-full">Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
