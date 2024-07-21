import { SignUpForm } from "@/components/form/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="w-full md:max-w-sm rounded-xl bg-white px-5 py-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Create Account</h1>
        <p className="text-sm text-gray-500">
          Create an account to get started
        </p>
      </div>
      <SignUpForm />
      <p className="text-sm text-gray-500 ">
        Already have an account?{" "}
        <Link href={"/sign-in"} className="text-black">
          Log in
        </Link>
      </p>
    </div>
  );
}
