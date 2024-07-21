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

export const SignInForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    console.log(values);
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
            {error && <ErrorMsg error={error} />}
            <SubmitButton label="Submit" isLoading={submitting} />
          </div>
        </form>
      </Form>
    </div>
  );
};
