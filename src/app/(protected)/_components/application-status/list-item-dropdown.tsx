"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useApplicationStore } from "@/hooks/use-zustand";
import { JobApplication } from "@/models/User";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export const ListItemDropdown = ({
  status,
}: {
  status: "Bookmarked" | "Applied" | "Interview Scheduled" | "Got Offer";
}) => {
  const [mounted, setMounted] = useState(false);
  const { applications, setApplications, refreshApplications } =
    useApplicationStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [open, setOpen] = useState(false);

  if (!mounted)
    return (
      <Button size={"sm"} variant={"ghost"}>
        <Ellipsis className="size-4" />
      </Button>
    );

  const handleClearList = async (status: string) => {
    const updatedApplications = applications.filter(
      (application: JobApplication) => application.applicationStatus !== status
    );
    setApplications(updatedApplications as JobApplication[]);
    try {
      await axios.patch(`/api/clear-applications?status=${status}`);
    } catch (error) {
      console.log(error);
      toast.error("Error clearing list");
    } finally {
      refreshApplications();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="select-none w-full">
          <Button size={"sm"} variant={"ghost"}>
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-max">
          <DropdownMenuItem
            className="text-gray-500"
            onClick={() => setOpen(true)}
          >
            <button className="w-full h-full">Clear List</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear List</AlertDialogTitle>
            <AlertDialogDescription>
              This action will clear all the applications in this list. They can
              later be recovered from the trash section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClearList(status)}>
              Clear List
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
