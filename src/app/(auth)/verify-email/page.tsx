import { VerifyEmailChecker } from "@/components/form/verify-email/verify-email";
import { Suspense } from "react";

export default function VerifyEmail() {
  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 shadow-md">
      <div>
        <h1 className="text-lg font-semibold">Verifying Account</h1>
        <p className="text-sm text-gray-500">
          Please wait while we verify your account
        </p>
      </div>
      <Suspense>
        <VerifyEmailChecker />
      </Suspense>
    </div>
  );
}
