import { TriangleAlertIcon } from "lucide-react";

export const ErrorMsg = ({ error }: { error: string }) => {
  return (
    <div className="text-sm rounded-md bg-destructive px-5 py-3 text-white flex items-center gap-2">
      <TriangleAlertIcon className="size-4" />
      <p className="flex-1">{error}</p>
    </div>
  );
};
