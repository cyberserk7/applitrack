"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Protected Route</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
