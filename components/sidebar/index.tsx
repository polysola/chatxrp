"use client";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import React from "react";
import Logo from "../logo";
import SidebarToggle from "./sidebar-toggle";
import ThemeToggle from "./theme-toggle";
import NavBar from "./navbar";
import { useEffect } from "react";
import SubscriptionButton from "../subscription-button";
import Image from "next/image";
import Link from "next/link";

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4 mb-4">
      <Link
        href="https://t.me/ChatXPT_Portal"
        className="transition-opacity hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/tg.png" alt="Telegram" width={40} height={40} />
      </Link>
      <Link
        href="ttps://x.com/XRPAI_ChatXPT"
        className="transition-opacity hover:opacity-80"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/x.png" alt="Twitter" width={40} height={40} />
      </Link>
    </div>
  );
};

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
      <SubscriptionButton title="Buy Now" />
      {!isMinimal && <SocialLinks />}

      {/* Navigation Section */}
      <div className="flex-1 overflow-auto scrollbar-none py-4">
        <NavBar />
      </div>

      {/* Bottom Section */}
      <div
        className={cn(
          "border-t border-gray-800/60 p-4 mb-10",
          "flex items-center",
          isMinimal ? "justify-center" : "justify-between"
        )}
      >
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
