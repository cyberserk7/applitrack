import { Button } from "@/components/ui/button";
import { UserButton } from "./user-btn";

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col gap-5 w-full md:w-[300px] h-full bg-white overflow-y-auto border-r py-2 xl:py-3 px-5">
      <UserButton />
    </aside>
  );
};
