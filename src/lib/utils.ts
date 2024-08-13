import { JobApplication } from "@/models/User";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getDaysUntilInterview = (interviewDate: Date) => {
  const today = new Date();
  const interviewDateDate = new Date(interviewDate);
  return Math.ceil(
    (interviewDateDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const exportCanMoveToNextStep = (application: JobApplication , daysUntilInterview: number) => {
  if (
    application.applicationStatus === "Interview Scheduled" &&
    (daysUntilInterview > 0 || !application.interviewDate)
  ) {
    return false;
  }
  return true;
}

export const getNextAndPrevStep = (applicationStatus: string) => {
  let nextStep: string | undefined = undefined;
  let prevStep: string | undefined = undefined;

  switch (applicationStatus) {
    case "Bookmarked":
      nextStep = "Applied";
      break;
    case "Applied":
      nextStep = "Interview Scheduled";
      prevStep = "Bookmarked";
      break;
    case "Interview Scheduled":
      nextStep = "Got Offer";
      prevStep = "Applied";
      break;
    case "Got Offer":
      break;
    default:
      break;
  }

  return {nextStep, prevStep};
}

type Currency = "INR" | "USD" | "EUR" | null | undefined;

export function formatSalary(salary: number | null | undefined, currency: Currency): string {
  if (salary === null || salary === undefined || currency === null || currency === undefined) {
    return "Salary not disclosed";
  }

  switch (currency) {
    case "INR":
      const lpa = salary / 100000; // Convert to Lakhs
      return `${lpa} LPA`;

    case "USD":
    case "EUR":
      const k = salary / 1000; // Convert to thousands
      const symbol = currency === "USD" ? "$" : "€";
      return `${symbol}${k.toFixed(0)}K`;

    default:
      return "Salary not disclosed";
  }
}