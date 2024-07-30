"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SubmitButton } from "../submit-button";
import { useState } from "react";
import { toast } from "sonner";
import { useApplicationStore, useModalStore } from "@/hooks/use-zustand";
import axios from "axios";
import { SetInterviewDateSchema } from "@/schema/set-interview-date";

export function SetInterviewDateForm({
  applicationId,
}: {
  applicationId: string;
}) {
  const [loading, setLoading] = useState(false);
  const { onClose } = useModalStore();
  const { refreshApplications, refreshOverlappingInterviews } =
    useApplicationStore();

  async function onSubmit(values: z.infer<typeof SetInterviewDateSchema>) {
    setLoading(true);
    try {
      const res = await axios.patch(
        `/api/set-interview-date?applicationId=${applicationId}`,
        values
      );
      if (res.data.success) {
        toast.success("Interview date updated.");
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      refreshApplications();
      refreshOverlappingInterviews();
      setLoading(false);
    }
  }

  const form = useForm<z.infer<typeof SetInterviewDateSchema>>({
    resolver: zodResolver(SetInterviewDateSchema),
    defaultValues: {
      date: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    className="w-full"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isLoading={loading} label="Submit" />
      </form>
    </Form>
  );
}
