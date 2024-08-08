"use client";

import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { AlertCircle, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const VerifyEmailChecker = ({
  setHasVerified,
}: {
  setHasVerified: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = useCallback(async (token: string) => {
    try {
      await axios.post("/api/verify-email", { token });
      setHasVerified(true);
      toast.success("Account verified successfully.");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  if (!token) {
    return redirect("/sign-up");
  }

  return (
    <>
      <div className="w-full h-44 flex items-center justify-center text-gray-400">
        {loading ? (
          <Loader2 className="size-7 animate-spin" />
        ) : (
          error && (
            <div className="flex flex-col gap-2 items-center">
              <AlertCircle className="size-7" strokeWidth={1.5} />
              <span>{error}</span>
            </div>
          )
        )}
      </div>
      {error && (
        <Button className="w-full" asChild>
          <Link href={"/sign-up"}>
            Sign Up <ChevronRight className="size-4 ml-2" />
          </Link>
        </Button>
      )}
    </>
  );
};
