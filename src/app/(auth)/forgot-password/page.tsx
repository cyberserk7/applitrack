"use client";

import { ChangePasswordForm } from "@/components/form/forgot-password/change-password-form";
import { EmailForm } from "@/components/form/forgot-password/email-form";
import { OtpForm } from "@/components/form/forgot-password/otp-form";
import { Suspense, useState } from "react";

const Steps = {
  EMAIL: "EMAIL",
  OTP: "OTP",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(Steps.EMAIL);

  const handleNextStep = () => {
    if (step === Steps.EMAIL) {
      setStep(Steps.OTP);
    } else if (step === Steps.OTP) {
      setStep(Steps.CHANGE_PASSWORD);
    }
  };

  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Reset Password</h1>
        <p className="text-sm text-gray-500">
          {step === Steps.EMAIL &&
            "Enter the email address associated with your account"}
          {step === Steps.OTP && "Please enter the OTP sent in your email"}
          {step === Steps.CHANGE_PASSWORD && "Enter your new password"}
        </p>
      </div>
      {step === Steps.EMAIL && <EmailForm nextStep={handleNextStep} />}
      {step === Steps.OTP && (
        <Suspense>
          <OtpForm nextStep={handleNextStep} />
        </Suspense>
      )}
      {step === Steps.CHANGE_PASSWORD && (
        <Suspense>
          <ChangePasswordForm />
        </Suspense>
      )}
    </div>
  );
}
