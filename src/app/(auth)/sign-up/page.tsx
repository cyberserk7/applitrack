"use client";

import { SignUpForm } from "@/components/form/sign-up-form";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignUpPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-full md:h-full bg-white lg:rounded-3xl lg:shadow-lg">
      <div className="flex-[1_1_33.33%] h-full flex items-center justify-center">
        <div className="w-full md:max-w-sm py-10 px-5 space-y-5">
          {!emailSent ? (
            <>
              <Link href={"/"} className="">
                <Image
                  src={"/logo-black.png"}
                  height={500}
                  width={500}
                  alt="logo"
                  className="h-8 w-fit"
                />
              </Link>
              <div className="md:hidden">
                <h1 className="text-xl font-semibold">Create an account</h1>
                <h2 className="text-zinc-400">
                  Take control of your job search and get hired faster. Sign up
                  to get started.
                </h2>
              </div>
              <SignUpForm
                setEmailSent={setEmailSent}
                loading={loading}
                setLoading={setLoading}
              />
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href={"/sign-in"} className="text-black">
                  Log in
                </Link>
              </p>
              <div className="flex justify-center items-center">
                <div className="flex-1 bg-zinc-200 h-px" />
                <span className="text-xs text-zinc-400 px-2">OR</span>
                <div className="flex-1 bg-zinc-200 h-px" />
              </div>
              <Button
                className="w-full flex items-center gap-2 font-normal text-zinc-700"
                variant={"outline"}
                size={"lg"}
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await signIn("google");
                  setLoading(false);
                }}
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                <FcGoogle className="size-6" />
                Continue with Google
              </Button>
            </>
          ) : (
            <div className="w-full space-y-5 flex flex-col">
              <span className="text-sm text-green-600">
                Check your email for a verification link. If it&apos;s not in
                your inbox, check your spam folder too. Click the link to verify
                your account.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:flex flex-[2_2_66.67%] p-3">
        <div className="h-full w-full bg-gradient-to-br from-orange-700 via-orange-500 to-yellow-400 rounded-2xl flex flex-col items-center justify-center text-white font-semibold text-2xl gap-10 overflow-hidden px-10"></div>
      </div>
    </div>
  );
}
