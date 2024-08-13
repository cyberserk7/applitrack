"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import {
  applicationStatuses,
  workTypes,
} from "@/schema/add-application-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorMsg } from "../error-msg";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JobApplication } from "@/models/User";
import { editApplicationSchema } from "@/schema/edit-application-schema";
import { Button } from "@/components/ui/button";

export const EditAppplicationForm = ({
  application,
}: {
  application: JobApplication;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { onClose } = useModalStore();
  const [isRemote, setIsRemote] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR" | undefined>(
    undefined
  );
  const [salaryNotDisclosed, setSalaryNotDisclosed] = useState(false);
  const { refreshApplications, refreshOverlappingInterviews } =
    useApplicationStore();

  const form = useForm<z.infer<typeof editApplicationSchema>>({
    resolver: zodResolver(editApplicationSchema),
    defaultValues: {
      jobRole: application && application.jobRole,
      companyName: application && application.companyName,
      currency: (application && application.currency) || undefined,
      salary: (application && application.salary) || undefined,
      jobCountry: application && application.jobCountry,
      jobLocation: application && application.jobLocation,
      workType: application && application.workType,
      //@ts-ignore
      jobPostLink: application && application.jobPostLink,
    },
  });

  const onSave = async (values: z.infer<typeof editApplicationSchema>) => {
    setSubmitting(true);
    let payload = {};
    if (salaryNotDisclosed) {
      payload = {
        ...values,
        currency: null,
        salary: null,
      };
    } else {
      payload = {
        ...values,
      };
    }

    if (isRemote) {
      payload = {
        ...payload,
        jobCountry: null,
        jobLocation: null,
      };
    }

    try {
      const res = await axios.post(
        `/api/edit-application?applicationId=${application?._id}`,
        payload
      );
      if (res.data.success) {
        refreshApplications();
        refreshOverlappingInterviews();
        onClose();
        toast.success("Application updated successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (application?.workType === "Remote") {
      setIsRemote(true);
    }
    if (!application?.currency || !application?.salary) {
      setSalaryNotDisclosed(true);
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="jobPostLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posting Link</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://www.linkedin.com/jobs/view/123456789/"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Backend Developer"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Google"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 py-1 pt-2">
            <FormLabel className="w-full flex items-center justify-between">
              <div className="flex gap-0.5">
                Salary{" "}
                <span className="text-gray-400 font-normal">(Per Annum)</span>
              </div>
              <Label className="flex items-center gap-2 text-zinc-700 text-sm cursor-pointer">
                <Checkbox
                  checked={salaryNotDisclosed}
                  onCheckedChange={() => {
                    setSalaryNotDisclosed(!salaryNotDisclosed);
                    if (salaryNotDisclosed) {
                      form.setValue("currency", undefined!);
                      form.setValue("salary", null);
                    }
                  }}
                />
                <span>Salary Not Disclosed</span>
              </Label>
            </FormLabel>
            {!salaryNotDisclosed && (
              <div className="flex w-full items-center gap-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Select
                          value={salaryNotDisclosed ? undefined : field.value!}
                          onValueChange={field.onChange}
                          onOpenChange={() => {
                            if (field.value) {
                              setCurrency(field.value);
                            }
                          }}
                        >
                          <SelectTrigger className="min-w-20 bg-zinc-50">
                            <SelectValue
                              placeholder="Select Currency"
                              className=""
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"INR"}>INR</SelectItem>
                            <SelectItem value={"USD"}>USD</SelectItem>
                            <SelectItem value={"EUR"}>EUR</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          value={salaryNotDisclosed ? undefined : field.value!}
                          placeholder={
                            salaryNotDisclosed
                              ? "Salary Not Disclosed"
                              : currency && currency === "INR"
                              ? "₹ XXXXXXXX"
                              : currency === "USD"
                              ? "$ XXXXXXXX"
                              : "€ XXXXXXXX"
                          }
                          type="number"
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    onOpenChange={() => {
                      if (field.value === "Remote") {
                        setIsRemote(true);
                      } else {
                        setIsRemote(false);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full bg-zinc-50">
                      <SelectValue placeholder="Select Type" className="" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((workType, index) => (
                        <SelectItem key={index} value={workType}>
                          {workType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isRemote && (
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="jobLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value!}
                          placeholder="Hyderabad"
                          type="text"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="jobCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value!}
                          placeholder="India"
                          type="text"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {error && <ErrorMsg error={error} />}
          <div className="flex gap-2 items-center w-full">
            <Button
              size={"lg"}
              className="flex-1 w-full"
              variant={"outline"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <SubmitButton isLoading={submitting} label="Save Application" />
          </div>
        </div>
      </form>
    </Form>
  );
};
