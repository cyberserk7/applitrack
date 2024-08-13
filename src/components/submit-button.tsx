import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const SubmitButton = ({
  label,
  isLoading,
  className,
}: {
  label: string;
  isLoading: boolean;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      className={cn("flex-1 w-full", className)}
      disabled={isLoading}
      size={"lg"}
    >
      {isLoading && <Loader2 className="size-4 animate-spin mr-2" />} {label}
    </Button>
  );
};
