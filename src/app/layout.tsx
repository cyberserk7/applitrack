import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";
import { ModalProvider } from "@/providers/ModalProvider";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppliTrack",
  description: "The ultimate job application tracking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={cn("", inter.className)}>
          {children}
          <Toaster position="bottom-right" />
          <ModalProvider />
        </body>
      </AuthProvider>
    </html>
  );
}
