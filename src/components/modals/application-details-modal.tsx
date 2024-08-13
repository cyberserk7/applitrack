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
import { ArrowLeft, ArrowRight, Edit, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import {
  exportCanMoveToNextStep,
  formatSalary,
  getDaysUntilInterview,
  getNextAndPrevStep,
} from "@/lib/utils";

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

  const salary = formatSalary(application?.salary, application?.currency);

  const { nextStep, prevStep } = getNextAndPrevStep(
    application?.applicationStatus
  );

  const daysUntilInterview = getDaysUntilInterview(application?.interviewDate);

  let canMoveToNextStep = exportCanMoveToNextStep(
    application,
    daysUntilInterview
  );
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            Find the application details below.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-8">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg py-2 px-3 border bg-zinc-100/40">
              <div className="text-gray-700">
                <span className="font-semibold">Position: </span>
                <span className="">{application?.jobRole}</span>{" "}
              </div>
            </div>
            <div className="rounded-lg py-2 px-3 border bg-zinc-100/40">
              <div className="text-gray-700">
                <span className="font-semibold">Company: </span>
                <span className="">{application?.companyName}</span>{" "}
              </div>
            </div>
            <div className="rounded-lg py-2 px-3 border bg-zinc-100/40">
              <div className="text-gray-700">
                <>
                  <span className="font-semibold">Salary: </span>
                  <span className="">{salary}</span>{" "}
                </>
              </div>
            </div>

            <div className="rounded-lg py-2 px-3 border bg-zinc-100/40">
              <div className="text-gray-700">
                <span className="font-semibold">Work Type: </span>
                <span className="">
                  {application?.workType === "Onsite" ? "In Person" : "Remote"}
                </span>{" "}
              </div>
            </div>
            {application?.workType === "Onsite" && (
              <div className="rounded-lg py-2 px-3 border bg-zinc-100/40">
                <div className="text-gray-700">
                  <span className="font-semibold">Location: </span>
                  <span className="">
                    {application?.jobLocation}, {application?.jobCountry}
                  </span>{" "}
                </div>
              </div>
            )}
            {application?.applicationStatus === "Interview Scheduled" && (
              <div className="rounded-lg py-2 px-3 border bg-zinc-100/40">
                <div className="text-gray-700">
                  <span className="font-semibold">Interview Date: </span>
                  {application?.interviewDate ? (
                    <span className="">
                      {new Date(
                        application?.interviewDate
                      ).toLocaleDateString()}
                    </span>
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
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex gap-2 w-full">
              {prevStep && !application?.interviewDate && (
                <Button
                  className="flex-1 w-full flex items-center gap-1 text-sm border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
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
                  className="flex-1 w-full flex items-center gap-1 text-sm border px-2 py-1 rounded hover:bg-dashboardbgdarker transition hover:text-gray-700"
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
            <div className="flex items-center gap-2">
              <Button
                className="w-full text-sm flex-1 flex items-center gap-1.5"
                variant={"outline"}
                size={"sm"}
                disabled={loading}
                onClick={() => onOpen("edit-application", { application })}
              >
                <Edit className="size-4" strokeWidth={2.5} /> Edit Application
              </Button>
              <Button
                className="w-full text-sm flex-1 flex items-center gap-1.5"
                variant={"destructive"}
                size={"sm"}
                disabled={loading}
                onClick={() =>
                  handleArchiveApplication(application?._id as string)
                }
              >
                <Trash className="size-4" strokeWidth={2.5} />
                Delete Application
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
