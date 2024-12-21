"use client";

import { useChat } from "ai/react";
import { Send, StopCircle, Eraser } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import UserMessage from "@/components/dashboard/user-message";
import AiResponse from "@/components/dashboard/ai-response";
import { Textarea } from "@/components/ui/textarea";
import ToolsNavigation from "@/components/dashboard/tools-navigation";
import MarkdownResponse from "@/components/dashboard/markdown-responsive";
import { useProState } from "@/store/pro-store";

const ConversationPage = () => {
  const { handleOpenOrCloseProModal } = useProState();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    setMessages,
  } = useChat({
    api: "/api/conversation",
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e);
      }
    }
  };

  useEffect(() => {
    if (error) {
      const errorParsed = JSON.parse(error?.message);
      if (errorParsed?.status === 403) {
        handleOpenOrCloseProModal();
      }
    }
  }, [error, handleOpenOrCloseProModal]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Messages Container */}
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={containerRef}
          className="h-full overflow-y-auto px-4 md:px-6 pb-32 pt-4 space-y-6
                     scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 
                     scrollbar-track-transparent"
        >
          {messages.length > 0 ? (
            <>
              {messages.map((m) => (
                <div key={m.id} className="animate-fadeIn">
                  {m.role === "user" ? (
                    <UserMessage>
                      <div className="prose dark:prose-invert max-w-none">
                        <MarkdownResponse content={m.content} />
                      </div>
                    </UserMessage>
                  ) : (
                    <AiResponse>
                      <div className="prose dark:prose-invert max-w-none">
                        <MarkdownResponse content={m.content} />
                      </div>
                    </AiResponse>
                  )}
                </div>
              ))}

              {/* Clear Chat Button */}
              <Button
                size="sm"
                onClick={handleClearChat}
                variant="outline"
                className="fixed right-6 bottom-24 bg-background/95 backdrop-blur-sm
                         border border-border/50 hover:bg-background/80 hover:border-border
                         transition-all duration-200 gap-2"
              >
                <Eraser className="w-4 h-4" />
                Clear chat
              </Button>
            </>
          ) : (
            <ToolsNavigation title="Conversation" />
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-background/80 pt-4 pb-4 px-4 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={isLoading ? stop : handleSubmit}
            className="relative group"
          >
            <Textarea
              placeholder="Do you have any questions today?"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] pr-20 resize-none rounded-xl
                       bg-white/5 dark:bg-black/5
                       border-black/10 dark:border-white/10
                       focus:border-primary/50 focus:ring-primary/50
                       transition-all duration-200
                       placeholder:text-muted-foreground/80"
              autoFocus
            />
            <Button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-2 h-8 px-3 rounded-lg
                       bg-primary hover:bg-primary/90
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <StopCircle className="h-4 w-4" /> Stop
                </div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ConversationPage;
