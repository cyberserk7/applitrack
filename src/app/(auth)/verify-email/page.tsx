"use client";

import { VerifyEmailChecker } from "@/components/form/verify-email/verify-email";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

export default function VerifyEmail() {
  const [hasVerified, setHasVerified] = useState(false);
  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 shadow-md">
      {!hasVerified ? (
        <>
          <div>
            <h1 className="text-lg font-semibold">Verifying Account</h1>
            <p className="text-sm text-gray-500">
              Please wait while we verify your account
            </p>
          </div>
          <Suspense>
            <VerifyEmailChecker setHasVerified={setHasVerified} />
          </Suspense>
        </>
      ) : (
        <div className="flex flex-col gap-5">
          <span className="text-sm text-green-600">
            Account verified successfully. You can now sign in using your
            credentials.
          </span>
          <Button
            asChild
            className="flex items-center gap-2"
            variant={"outline"}
          >
            <Link href={"/sign-in"} className="">
              Back to Sign In
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
