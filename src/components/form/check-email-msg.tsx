import { MailIcon } from "lucide-react";

export const CheckEmailMsg = ({ emailPrompt }: { emailPrompt: string }) => {
  return (
    <div className="text-sm rounded-md bg-blue-500 px-5 py-3 text-white flex items-center gap-2">
      <MailIcon className="size-4" />
      <p>{emailPrompt}</p>
    </div>
  );
};
