"use client";

import { AddApplicationModal } from "@/components/modals/add-application-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddApplicationModal />
    </>
  );
};
