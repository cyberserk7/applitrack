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
  addApplicationSchema,
  applicationStatuses,
  workTypes,
} from "@/schema/add-application-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

interface AddApplicationFormProps {
  status?: string;
}

export const AddApplicationForm = ({ status }: AddApplicationFormProps) => {
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

  const form = useForm<z.infer<typeof addApplicationSchema>>({
    resolver: zodResolver(addApplicationSchema),
    defaultValues: {
      jobRole: "",
      companyName: "",
      currency: undefined,
      salary: undefined,
      jobCountry: undefined,
      jobLocation: undefined,
      workType: undefined,
      //@ts-ignore
      applicationStatus: status || undefined,
      jobPostLink: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addApplicationSchema>) => {
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
      const res = await axios.post("/api/add-application", payload);
      if (res.data.success) {
        refreshApplications();
        refreshOverlappingInterviews();
        onClose();
        toast.success("Application added successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <FormField
            control={form.control}
            name="applicationStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full  bg-zinc-50">
                      <SelectValue placeholder="Select Status" className="" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationStatuses.map((applicationStatus, index) => (
                        <SelectItem key={index} value={applicationStatus}>
                          {applicationStatus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          {error && <ErrorMsg error={error} />}
          <SubmitButton
            isLoading={submitting}
            label="Add Application"
            className="h-max py-3"
          />
        </div>
      </form>
    </Form>
  );
};
