"use client";

import { emailSchema } from "@/schema/email-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorMsg } from "../error-msg";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const EmailForm = ({ nextStep }: { nextStep: () => void }) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post("/api/check-email", values);
      if (res.data.success) {
        router.replace(`/forgot-password?email=${values.email}`);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email address"
                  type="email"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          {error && <ErrorMsg error={error} />}
          <SubmitButton
            label="Send OTP"
            isLoading={submitting}
            disabled={submitting}
          />
        </div>
      </form>
    </Form>
  );
};
