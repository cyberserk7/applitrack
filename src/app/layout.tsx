import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppliTrack",
  description:
    "Track applications, organize your documents, and find new oppurtunities — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <EdgeStoreProvider>
          <ViewTransitions>
            <body className={cn("", inter.className)}>
              {children}
              <Toaster position="bottom-right" />
              <ModalProvider />
            </body>
          </ViewTransitions>
          <Analytics />
        </EdgeStoreProvider>
      </AuthProvider>
    </html>
  );
}
