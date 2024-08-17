"use client";

import { ChangePasswordForm } from "@/components/form/forgot-password/change-password-form";
import { EmailForm } from "@/components/form/forgot-password/email-form";
import { OtpForm } from "@/components/form/forgot-password/otp-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const Steps = {
  EMAIL: "EMAIL",
  OTP: "OTP",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(Steps.EMAIL);
  const [success, setSuccess] = useState("");

  const handleNextStep = () => {
    if (step === Steps.EMAIL) {
      setStep(Steps.OTP);
    } else if (step === Steps.OTP) {
      setStep(Steps.CHANGE_PASSWORD);
    }
  };

  return (
    <div className="h-full w-full flex items-start lg:items-center justify-center px-5">
      <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 space-y-5 shadow-md mt-40 lg:mt-0">
        {success ? (
          <span className="text-sm text-green-600">{success}</span>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <button
                className="flex gap-1 items-center text-sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="size-4" />
                Go Back
              </button>
              <div>
                <h1 className="text-lg font-semibold">Reset Password</h1>
                <p className="text-sm text-gray-500">
                  {step === Steps.EMAIL &&
                    "Enter the email address associated with your account"}
                  {step === Steps.OTP &&
                    "Please enter the OTP sent in your email"}
                  {step === Steps.CHANGE_PASSWORD && "Enter your new password"}
                </p>
              </div>
            </div>
            {step === Steps.EMAIL && <EmailForm nextStep={handleNextStep} />}
            {step === Steps.OTP && (
              <Suspense>
                <OtpForm nextStep={handleNextStep} />
              </Suspense>
            )}
            {step === Steps.CHANGE_PASSWORD && (
              <Suspense>
                <ChangePasswordForm setSuccess={setSuccess} />
              </Suspense>
            )}
          </>
        )}
      </div>
    </div>
  );
}
