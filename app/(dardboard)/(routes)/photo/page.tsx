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
import { Send, Expand, Download, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        toast({
          variant: "destructive",
          description: "Permission denied. Please check your subscription.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
      setMessages((current) => current.slice(0, -2));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={containerRef}
          className="h-full overflow-y-auto px-4 md:px-6 pt-4 pb-32 space-y-6"
        >
          {messages.length > 0 ? (
            <>
              {messages.map((m) => (
                <div key={m.id}>
                  {m.role === "user" ? (
                    <UserMessage>
                      <div className="text-sm text-muted-foreground">
                        {m.content}
                      </div>
                    </UserMessage>
                  ) : (
                    <AiResponse>
                      {m.content ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {typeof m.content === "object" &&
                            m.content?.map((url: string) => (
                              <div
                                key={url}
                                className="group relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                              >
                                {/* Image */}
                                <div className="relative aspect-square">
                                  <Image
                                    src={url}
                                    alt="Generated image"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 justify-end">
                                    <Button
                                      variant="secondary"
                                      size="icon"
                                      className="h-8 w-8 backdrop-blur-sm"
                                      asChild
                                    >
                                      <a href={url} target="_blank">
                                        <Expand className="h-4 w-4" />
                                      </a>
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="icon"
                                      className="h-8 w-8 backdrop-blur-sm"
                                      asChild
                                    >
                                      <a href={url} download>
                                        <Download className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
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

              {/* Clear Chat Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessages([])}
                className="fixed right-6 bottom-24 bg-background/95 backdrop-blur-sm"
              >
                Clear chat
              </Button>
            </>
          ) : (
            <ToolsNavigation title="Photo" />
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-background/80 pt-4 pb-4 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* Textarea with Settings */}
              <div className="relative">
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Describe the image you want to create..."
                            className="min-h-[60px] pr-24 resize-none rounded-xl 
                                     bg-white/5 dark:bg-black/5
                                     border-black/10 dark:border-white/10
                                     focus:border-primary/50 focus:ring-primary/50
                                     transition-all duration-300"
                            {...field}
                            onKeyDown={handleKeyDown}
                          />
                          <div className="absolute right-2 top-2 flex gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                                >
                                  <Settings2 className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                align="end"
                                className="w-72 backdrop-blur-xl bg-white/80 dark:bg-black/80"
                              >
                                <div className="space-y-3">
                                  <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          value={field.value}
                                          onValueChange={field.onChange}
                                          disabled={isLoading}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select model"
                                              />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {MODEL_OPTIONS.map((option) => (
                                              <SelectItem
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />

                                  <div className="grid grid-cols-2 gap-3">
                                    <FormField
                                      control={form.control}
                                      name="amount"
                                      render={({ field }) => (
                                        <FormItem>
                                          <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isLoading}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue
                                                  defaultValue={field.value}
                                                  placeholder="Amount"
                                                />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {PHOTO_AMOUNT_OPTIONS.map(
                                                (option) => (
                                                  <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </SelectItem>
                                                )
                                              )}
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
                                            onValueChange={field.onChange}
                                            disabled={isLoading}
                                          >
                                            <FormControl>
                                              <SelectTrigger>
                                                <SelectValue
                                                  defaultValue={field.value}
                                                  placeholder="Resolution"
                                                />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {PHOTO_RESOLUTION_OPTIONS.map(
                                                (option) => (
                                                  <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                  >
                                                    {option.label}
                                                  </SelectItem>
                                                )
                                              )}
                                            </SelectContent>
                                          </Select>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="h-8 px-3 rounded-lg bg-primary hover:bg-primary/90"
                            >
                              {isLoading ? (
                                <Loading className="h-4 w-4" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
