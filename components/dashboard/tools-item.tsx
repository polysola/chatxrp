"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toolItemColorVariants = cva(
  "absolute inset-0 opacity-30 rounded-xl transition-transform duration-500 group-hover:opacity-50",
  {
    variants: {
      color: {
        code: "bg-gradient-to-br from-green-500 to-emerald-600",
        audio: "bg-gradient-to-br from-orange-500 to-red-600",
        tools: "bg-gradient-to-br from-amber-500 to-yellow-600",
        photo: "bg-gradient-to-br from-violet-500 to-purple-600",
        conversation: "bg-gradient-to-br from-blue-500 to-cyan-600",
      },
    },
    defaultVariants: {
      color: "code",
    },
  }
);

const iconContainerVariants = cva(
  "relative flex justify-center items-center mr-6 rounded-full w-20 h-20 p-2 overflow-hidden backdrop-blur-md shadow-md transition-all duration-500 group-hover:scale-125",
  {
    variants: {
      color: {
        code: "bg-green-500/20 border border-green-400/30",
        audio: "bg-orange-500/20 border border-orange-400/30",
        tools: "bg-amber-500/20 border border-amber-400/30",
        photo: "bg-violet-500/20 border border-violet-400/30",
        conversation: "bg-blue-500/20 border border-blue-400/30",
      },
    },
    defaultVariants: {
      color: "code",
    },
  }
);

export interface ToolItemProps {
  icon: string;
  title: string;
  url: string;
  color?: string;
  slug: "code" | "audio" | "tools" | "photo" | "conversation";
}

const ToolItem: React.FC<ToolItemProps> = ({ icon, title, url, slug }) => {
  return (
    <div className="mb-6 last:mb-0">
      <Link href={url} className="block">
        <div
          className={cn(
            "group relative rounded-2xl overflow-hidden transition-all duration-500",
            "bg-gradient-to-br from-black/10 to-black/20 dark:from-white/10 dark:to-white/20",
            "border border-gray-300/30 dark:border-white/20 shadow-lg",
            "hover:shadow-2xl hover:-rotate-1 hover:scale-105",
            "p-6 md:p-8"
          )}
        >
          {/* Background gradient effect */}
          <div className={cn(toolItemColorVariants({ color: slug }))} />

          <div className="relative flex items-center justify-between">
            {/* Icon container */}
            <div className={cn(iconContainerVariants({ color: slug }))}>
              {/* Sparkle effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Image
                width={32}
                height={32}
                src={icon}
                alt={title}
                className="relative z-10"
              />
            </div>

            <div className="flex flex-col items-start ml-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 transition-colors duration-500 group-hover:text-black dark:group-hover:text-white">
                {title}
              </h3>

              {/* Underline animation */}
              <span className="mt-1 inline-block bg-gradient-to-r from-pink-500 to-yellow-500 h-0.5 w-0 group-hover:w-16 transition-all duration-500"></span>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-500 transform group-hover:translate-x-2 group-hover:text-black dark:group-hover:text-white" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ToolItem;
