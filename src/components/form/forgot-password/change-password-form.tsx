"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "@/schema/set-password-schema";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export const ChangePasswordForm = ({
  setSuccess,
}: {
  setSuccess: (text: string) => void;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof setPasswordSchema>) => {
    setSubmitting(true);

    try {
      const res = await axios.post("/api/change-password", {
        ...values,
        email,
      });
      if (res.data.success) {
        setSuccess(
          "Password has been changed successfully. You will now be redirected to sign in page shortly."
        );
        setTimeout(() => {
          router.replace("/sign-in");
        }, 3000);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      }
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          label="Change Password"
          isLoading={submitting}
          disabled={submitting}
        />
      </form>
    </Form>
  );
};
