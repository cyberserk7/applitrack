"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Link2, Loader2, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

export const ApplicationDetailsModal = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, type, data, onOpen } = useModalStore();
  const isModalOpen = isOpen && type === "application-details";

  const { application } = data;

  const { refreshApplications, refreshOverlappingInterviews } =
    useApplicationStore();

  const handleMoveApplication = async (
    applicationId: string,
    status: string
  ) => {
    setLoading(true);
    try {
      await axios.patch(
        `/api/move-application?applicationId=${applicationId}&status=${status}`
      );
      onClose();
    } catch (error) {
      toast.error("Failed to move application");
    } finally {
      setLoading(false);
      refreshApplications();
      refreshOverlappingInterviews();
    }
  };

  const handleArchiveApplication = async (applicationId: string) => {
    setLoading(true);

    try {
      await axios.patch(
        `/api/archive-application?applicationId=${applicationId}`
      );
      toast.success("Application added to trash");
    } catch (error) {
      toast.error("Failed to delete application");
    } finally {
      setLoading(false);
      refreshApplications();
      refreshOverlappingInterviews();
      onClose();
    }
  };

  let nextStep: string | undefined = undefined;
  let prevStep: string | undefined = undefined;

  switch (application?.applicationStatus) {
    case "Bookmarked":
      nextStep = "Applied";
      break;
    case "Applied":
      nextStep = "Interview Scheduled";
      prevStep = "Bookmarked";
      break;
    case "Interview Scheduled":
      nextStep = "Got Offer";
      prevStep = "Applied";
      break;
    case "Got Offer":
      break;
    default:
      break;
  }

  let daysUntilInterview = 0;
  if (application?.interviewDate) {
    const today = new Date();
    const interviewDate = new Date(application.interviewDate);
    daysUntilInterview = Math.ceil(
      (interviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  let canMoveToNextStep = true;
  if (
    application?.applicationStatus === "Interview Scheduled" &&
    (daysUntilInterview > 0 || !application.interviewDate)
  ) {
    canMoveToNextStep = false;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            Find the application details below.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-5">
          <Button asChild size={"sm"}>
            <Link
              href={application?.jobPostLink!}
              className="text-xs"
              target="_blank"
            >
              Link to Job Posting <Link2 className="size-4 ml-2" />
            </Link>
          </Button>
          <div className="text-sm">
            <h2 className="text-gray-500">
              Role:{" "}
              <span className="text-gray-700 font-medium">
                {application?.jobRole}
              </span>{" "}
            </h2>
            <h2 className="text-gray-500">
              Company:{" "}
              <span className="text-gray-700 font-medium">
                {application?.companyName}
              </span>{" "}
            </h2>
            <h2 className="text-gray-500">
              Salary:{" "}
              <span className="text-gray-700 font-medium">
                Rs.{application?.salary} per year
              </span>{" "}
            </h2>
            <h2 className="text-gray-500">
              Work Type:{" "}
              <span className="text-gray-700 font-medium">
                {application?.workType === "Onsite" ? "In Person" : "Remote"}
              </span>{" "}
            </h2>
            {application?.workType === "Onsite" && (
              <h2 className="text-gray-500">
                Company Location:{" "}
                <span className="text-gray-700 font-medium">
                  {application?.jobLocation}, {application?.jobCountry}
                </span>{" "}
              </h2>
            )}
            {application?.applicationStatus === "Interview Scheduled" && (
              <h2 className="text-gray-500">
                Interview Date:{" "}
                <span className="text-gray-700 font-medium">
                  {application?.interviewDate ? (
                    new Date(application?.interviewDate).toLocaleDateString()
                  ) : (
                    <button
                      className="px-2 py-1 rounded bg-red-100/30 text-xs text-red-600 border border-red-200"
                      onClick={() => {
                        onOpen("set-interview-date", {
                          application,
                        });
                      }}
                    >
                      Set Date
                    </button>
                  )}
                </span>{" "}
              </h2>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 w-full">
              {prevStep && !application?.interviewDate && (
                <Button
                  className="flex-1 w-full flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
                  onClick={() => {
                    handleMoveApplication(application?._id as string, prevStep);
                  }}
                  size={"sm"}
                  variant={"outline"}
                  disabled={loading}
                >
                  <ArrowLeft className="size-4" />
                  Move to {prevStep}
                </Button>
              )}
              {nextStep && canMoveToNextStep && (
                <Button
                  className="flex-1 w-full flex items-center gap-1 text-xs border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
                  onClick={() => {
                    handleMoveApplication(application?._id as string, nextStep);
                  }}
                  size={"sm"}
                  variant={"outline"}
                  disabled={loading}
                >
                  Move to {nextStep}
                  <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
            <Button
              className="w-full text-xs"
              variant={"destructive"}
              size={"sm"}
              disabled={loading}
              onClick={() =>
                handleArchiveApplication(application?._id as string)
              }
            >
              Remove Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
