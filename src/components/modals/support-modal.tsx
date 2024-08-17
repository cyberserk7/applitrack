"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-zustand";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitButton } from "../submit-button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const supportFormSchema = z.object({
  text: z.string().min(1, "Please enter a message"),
});

export const SupportModal = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "support";

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof supportFormSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/send-support-message", {
        text: data.text,
      });
      if (res.data.success) {
        toast.success(
          "The support message has been sent, the admin will get back to you soon."
        );
        onClose();
      }
    } catch (error) {
      toast.error("Please try again later");
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get Support</DialogTitle>
          <DialogDescription>
            Please contact us if you have any questions or need assistance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Input disabled placeholder={session?.user?.email} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please describe your issue here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <SubmitButton
                  label="Submit"
                  isLoading={loading}
                  className="w-max"
                  disabled={loading}
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
