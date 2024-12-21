"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ToolsNavigation from "@/components/dashboard/tools-navigation";
import { cn } from "@/lib/utils";
import AiResponse from "@/components/dashboard/ai-response";
import UserMessage from "@/components/dashboard/user-message";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  MODEL_OPTIONS,
  PHOTO_AMOUNT_OPTIONS,
  PHOTO_RESOLUTION_OPTIONS,
} from "@/constants";
import Loading from "@/components/loading";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required",
  }),
  style: z.string().min(1),
  model: z.string().min(1),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

interface MessageType {
  id: string;
  content: string | string[];
  role: "user" | "assistant";
}

const PhotoPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "natural",
      model: "dall-e-2",
      amount: "1",
      resolution: "1024x1024",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleScrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newlines in the textarea
      onSubmit(form.getValues());
    }
  };
  const onEdit = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          prompt: "Add logo bird to the image",
          resolution: "1024x1024",
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  const OnVariation = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/variation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          prompt: "Add logo bird to the image",
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    handleScrollToBottom();
    try {
      setMessages((current) => [
        ...current,
        {
          id: uuidv4(),
          role: "user",
          content: `${values.prompt} | ${values.amount} | ${values.resolution}`,
        },
        {
          id: uuidv4(),
          role: "assistant",
          content: "",
        },
      ]);

      handleScrollToBottom();

      form.reset();

      const { data } = await axios.post("/api/photo", values);
      const urls = data.data.map((image: { url: string }) => image.url);

      setMessages((current) => {
        const newMessages = [...current];
        newMessages[newMessages.length - 1].content = urls;
        return newMessages;
      });
      handleScrollToBottom();
    } catch (error: any) {
      if (error?.response?.status === 403) {
      } else {
        setMessages([]);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div>
      <div className="h-full relative flex flex-col justify-between">
        <div
          ref={containerRef}
          className="h-[calc(100vh-280px)] md:h-[calc(100vh-180px)] relative overflow-y-auto space-y-10 scroll-smooth pb-16"
        >
          {messages.length > 0 ? (
            <>
              {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap px-4">
                  {m.role === "user" ? (
                    <UserMessage>{m.content}</UserMessage>
                  ) : (
                    <AiResponse>
                      {m.content ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {typeof m.content === "object" &&
                            m.content?.map((url: string) => (
                              <div key={url} className="flex flex-col gap-3">
                                <Image
                                  src={url}
                                  width={512}
                                  height={512}
                                  className="rounded-lg w-full"
                                  alt={url}
                                />
                                <div className="flex flex-wrap gap-2 justify-center">
                                  <a href={url} target="_blank">
                                    <Button size="sm" className="w-24">
                                      Download
                                    </Button>
                                  </a>
                                  <Button
                                    onClick={() => onEdit(url)}
                                    size="sm"
                                    className="w-24 hidden"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => OnVariation(url)}
                                    size="sm"
                                    className="w-24 hidden"
                                  >
                                    Variation
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <Loading />
                      )}
                    </AiResponse>
                  )}
                </div>
              ))}
              <div className="absolute left-0 bottom-0 text-right w-full pr-3">
                <Button size="sm" onClick={handleClearChat} variant="outline">
                  Clear chat
                </Button>
              </div>
            </>
          ) : (
            <ToolsNavigation title="Photo"></ToolsNavigation>
          )}
        </div>
      </div>

      <div className="border-t bg-background pt-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Please enter the image you want to create..."
                          className="min-h-20 resize-none md:min-h-12"
                          {...field}
                          onKeyDown={handleKeyDown}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        disabled={isLoading}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[120px]">
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MODEL_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        disabled={isLoading}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[100px]">
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PHOTO_AMOUNT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resolution"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        defaultValue={field.value}
                        disabled={isLoading}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[120px]">
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PHOTO_RESOLUTION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="gradient-btn md:w-12 h-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PhotoPage;
