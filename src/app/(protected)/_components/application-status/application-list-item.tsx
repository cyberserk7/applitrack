import { cn } from "@/lib/utils";
import { JobApplication } from "@/models/User";
import { Dot, SquareArrowOutUpRight, SquareArrowUpRight } from "lucide-react";
import Link from "next/link";

export const ApplicationListItem = ({
  application,
  isLastItem,
  isFirstItem,
  index,
}: {
  application: JobApplication;
  isLastItem: boolean;
  isFirstItem: boolean;
  index: number;
}) => {
  const LPA = application.salary / 100000;
  const isRemote = application.workType === "Remote";

  return (
    <div
      className={cn(
        "h-12 px-2.5 md:px-5 flex items-center bg-white border border-t-0 text-gray-700 text-sm justify-between",
        isLastItem && "rounded-b-lg",
        isFirstItem && "rounded-t-lg border-t",
        application.workType === "Remote" && "bg-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 hidden md:block">
          {application.applicationStatus[0]}A-{index + 1}
        </span>
        <span className="px-2 py-1 rounded bg-orange-100/30 text-xs text-orange-600 border border-orange-200">
          {LPA} LPA
        </span>
        <span className="text-sm font-medium line-clamp-1">
          {application.jobRole}, {application.companyName}{" "}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 text-gray-400 text-sm">
          {isRemote ? (
            <span className="px-2 py-1 rounded bg-green-100/30 text-xs text-green-600 border border-green-200">
              Remote
            </span>
          ) : (
            <span className="px-2 py-1 rounded bg-blue-100/30 text-xs text-blue-600 border border-blue-200">
              {application.jobLocation}, {application.jobCountry}
            </span>
          )}
        </div>
        <Link className="text-gray-400" href="" target="_blank">
          <SquareArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
};
