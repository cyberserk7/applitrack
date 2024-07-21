"use client";

import { ChangePasswordForm } from "@/components/form/forgot-password/change-password-form";
import { EmailForm } from "@/components/form/forgot-password/email-form";
import { OtpForm } from "@/components/form/forgot-password/otp-form";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Reset Password</h1>
        <p className="text-sm text-gray-500">
          {!email
            ? "Enter the email address associated with your account"
            : success
            ? "Enter your new password"
            : "Please enter the OTP sent in your email"}
        </p>
      </div>
      {!email ? (
        <EmailForm setEmail={setEmail} />
      ) : success ? (
        <ChangePasswordForm email={email} />
      ) : (
        <OtpForm email={email} setSuccess={setSuccess} />
      )}
    </div>
  );
}
