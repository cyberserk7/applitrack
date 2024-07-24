import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { ApplicationProvider } from "@/providers/ApplicationProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationProvider>
      <div className="h-full flex bg-dashboardbg">
        <Sidebar />
        <div className="h-full overflow-y-auto flex flex-col flex-1">
          <Suspense>
            <Navbar />
          </Suspense>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </ApplicationProvider>
  );
}
