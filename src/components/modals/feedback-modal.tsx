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
import { Label } from "../ui/label";
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
import { Switch } from "../ui/switch";

const feedbackFormSchema = z.object({
  message: z.string().min(1, "Please enter a message"),
  anonymous: z.boolean(),
});

export const FeedbackModal = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === "feedback";
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      message: "",
      anonymous: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof feedbackFormSchema>) => {
    const { message, anonymous } = data;
    let payload = {};
    if (anonymous) {
      payload = {
        content: message,
        userId: null,
      };
    } else {
      payload = {
        content: message,
        userId: session?.user?._id,
      };
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/send-feedback", payload);
      if (res.data.success) {
        toast.success(
          "Your feedback has been sent, thank you for your feedback!"
        );
        onClose();
        form.reset();
      }
    } catch (error) {
      toast.error("Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Please provide us with your valuable feedback. It helps us improve
            the application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="border rounded-lg p-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Keep this feedback anonymous
                </span>
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your feedback here"
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
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
