"use client";

import { otpSchema } from "@/schema/otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorMsg } from "../error-msg";

export const OtpForm = ({ nextStep }: { nextStep: () => void }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post("/api/send-otp", {
        ...values,
        email,
      });
      if (res.data.success) {
        nextStep();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="123456" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ErrorMsg error={error} />}
        <SubmitButton
          label="Submit"
          isLoading={submitting}
          disabled={submitting}
        />
      </form>
    </Form>
  );
};
