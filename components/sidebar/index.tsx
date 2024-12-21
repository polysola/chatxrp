"use client";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import React from "react";
import Logo from "../logo";
import SidebarToggle from "./sidebar-toggle";
import { MAX_FREE_COUNTS } from "@/constants";
// import { Progress } from "../ui/progress";
import ThemeToggle from "./theme-toggle";
// import SubscriptionButton from "../subscription-button";
import NavBar from "./navbar";

import { useEffect } from "react";

interface SidebarProps {
  className?: string;
  isProPlan?: boolean;
  userLimitCount?: number;
}

const Sidebar = ({ className, isProPlan, userLimitCount }: SidebarProps) => {
  const { isMinimal } = useSidebarStore();

  return (
    <div
      className={cn(
        "text-white flex flex-col h-screen bg-[#1C1C1F]",
        className
      )}
    >
      {/* Logo Section */}
      <div className="h-20 pl-7 pr-6 border-b border-gray-800/60">
        <div className="flex items-center justify-between w-full h-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-auto scrollbar-none py-4">
        <NavBar />
      </div>

      {/* Bottom Section */}
      <div
        className={cn(
          "border-t border-gray-800/60 p-4",
          "flex items-center",
          isMinimal ? "justify-center" : "justify-between"
        )}
      >
        {!isProPlan && !isMinimal && (
          <div className="w-full mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400">
                {userLimitCount} / {MAX_FREE_COUNTS} Free Generations
              </p>
            </div>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
