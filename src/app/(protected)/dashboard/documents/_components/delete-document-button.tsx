"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDocumentStore } from "@/hooks/use-zustand";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteDocumentButton = ({
  documentId,
  url,
}: {
  documentId: string;
  url: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { edgestore } = useEdgeStore();
  const { refreshDocuments } = useDocumentStore();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await edgestore.publicFiles.delete({
        url: url,
      });

      const res = await axios.delete(
        `/api/delete-document?documentId=${documentId}`
      );
      if (res.data.success) {
        refreshDocuments();
        toast.success("Document deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="text-gray-400 p-1 z-10 hover:text-red-500 transition flex items-center gap-2"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the document from your account. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
