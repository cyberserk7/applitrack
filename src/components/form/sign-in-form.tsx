"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitButton } from "../submit-button";
import { ErrorMsg } from "./error-msg";
import { signInSchema } from "@/schema/sign-in-schema";
import Link from "next/link";
import { CheckEmailMsg } from "./check-email-msg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignInForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailPrompt, setEmailPrompt] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setSubmitting(true);
    setError("");
    setEmailPrompt("");
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok) {
        router.replace("/dashboard");
      } else {
        if (res?.error === "AccessDenied") {
          setEmailPrompt("Please check your email for verification link");
        } else {
          if (res?.error === "CredentialsSignin") {
            setError("Invalid email or password");
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="amankumar@gmail.com"
                      type="email"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      className="w-full"
                    />
                  </FormControl>
                  <div className="flex w-full justify-end">
                    <Link
                      href={"/forgot-password"}
                      className="text-sm text-gray-500 hover:text-black transition"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 space-y-2">
            {emailPrompt && <CheckEmailMsg emailPrompt={emailPrompt} />}
            {error && <ErrorMsg error={error} />}
            <SubmitButton label="Submit" isLoading={submitting} />
          </div>
        </form>
      </Form>
    </div>
  );
};
