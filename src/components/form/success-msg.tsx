import { Check } from "lucide-react";

export const SuccessMsg = ({ success }: { success: string }) => {
  return (
    <div className="text-sm rounded-md bg-emerald-500 px-5 py-3 text-white flex items-center gap-2">
      <Check className="size-4" />
      <p>{success}</p>
    </div>
  );
};
