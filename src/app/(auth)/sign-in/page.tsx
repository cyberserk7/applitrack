import { SignInForm } from "@/components/form/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 space-y-5 shadow-md">
      <div>
        <h1 className="text-lg font-semibold">Sign In</h1>
        <p className="text-sm text-gray-500">
          Please enter credentials to access your account
        </p>
      </div>
      <SignInForm />
      <p className="text-sm text-gray-500 ">
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up"} className="text-black">
          Create account
        </Link>
      </p>
    </div>
  );
}
