"use client";

import { emailSchema } from "@/schema/email-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorMsg } from "../error-msg";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { z } from "zod";

export const EmailForm = ({
  setEmail,
}: {
  setEmail: (email: string) => void;
}) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    console.log(values);
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
          <SubmitButton label="Submit" isLoading={submitting} />
        </div>
      </form>
    </Form>
  );
};
