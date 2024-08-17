"use client";

import { SignInForm } from "@/components/form/sign-in-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-full md:h-full bg-white lg:rounded-3xl lg:shadow-lg">
      <div className="flex-[1_1_33.33%] h-full flex items-center justify-center">
        <div className="w-full md:max-w-sm py-10 px-5 space-y-5">
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
            <h1 className="text-lg font-semibold">Sign In</h1>
            <p className="text-sm text-gray-500">
              Please enter credentials to access your account
            </p>
          </div>
          <SignInForm loading={loading} setLoading={setLoading} />
          <p className="text-sm text-gray-500 ">
            Don&apos;t have an account?{" "}
            <Link href={"/sign-up"} className="text-black">
              Create account
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
        </div>
      </div>
      <div className="hidden lg:flex flex-[2_2_66.67%] p-3">
        <div className="h-full w-full bg-gradient-to-br from-orange-700 via-orange-500 to-yellow-400 rounded-2xl flex flex-col items-center justify-center text-white font-semibold text-2xl gap-10 overflow-hidden px-10"></div>
      </div>
    </div>
  );
}
