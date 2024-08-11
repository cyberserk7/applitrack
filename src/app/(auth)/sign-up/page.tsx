"use client";

import { SignUpForm } from "@/components/form/sign-up-form";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { useState } from "react";

export default function SignUpPage() {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 space-y-5 shadow-md z-10">
      {!emailSent ? (
        <>
          <div>
            <h1 className="text-lg font-semibold">Create Account</h1>
            <p className="text-sm text-gray-500">
              Create an account to get started
            </p>
          </div>
          <SignUpForm setEmailSent={setEmailSent} />
          <p className="text-sm text-gray-500 ">
            Already have an account?{" "}
            <Link href={"/sign-in"} className="text-black">
              Log in
            </Link>
          </p>
        </>
      ) : (
        <div className="w-full space-y-5 flex flex-col">
          <span className="text-sm text-green-600">
            Account created successfully. Check your email for verification
            link. Please click on the link to verify your account.
          </span>
        </div>
      )}
    </div>
  );
}
