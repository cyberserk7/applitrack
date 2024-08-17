"use client";

import { SubmitButton } from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDocumentStore, useModalStore } from "@/hooks/use-zustand";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const documentFormSchema = z.object({
  file: z.custom<File | null>(
    (val) => val instanceof File && val.type === "application/pdf",
    "PDF file is required"
  ),
  title: z.string().min(1, "Title is required"),
});

export const DocumentUploadForm = ({ type }: { type: string }) => {
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const { onClose } = useModalStore();
  const { refreshDocuments } = useDocumentStore();
  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      file: null,
      title: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof documentFormSchema>) => {
    const { file, title } = values;
    if (!file) {
      return;
    }
    setLoading(true);
    try {
      const fileUpload = await edgestore.publicFiles.upload({ file });
      const fileData = { url: fileUpload.url, title, type: type };
      const res = await axios.post("/api/upload-document", fileData);
      if (res.status === 200) {
        toast.success("Document uploaded successfully");
        refreshDocuments();
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange }, ...field }) => (
                <FormItem className="">
                  <FormLabel>
                    File{" "}
                    <span className="font-normal text-gray-400">
                      * (Format must be PDF)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          onChange(file);
                        } else {
                          return;
                        }
                      }}
                      type="file"
                      className="w-full cursor-pointer"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="File Title"
                      {...field}
                      type="text"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SubmitButton label="Submit" isLoading={loading} disabled={loading} />
        </form>
      </Form>
    </div>
  );
};
