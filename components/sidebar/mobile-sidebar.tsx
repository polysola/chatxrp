"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import Sidebar from ".";
import { useSidebarStore } from "@/store/sidebar-store";

interface MobileSidebarProps {
  className?: string;
  isProPlan?: boolean;
  userLimitCount?: number;
}

const MobileSidebar = ({
  className,
  isProPlan,
  userLimitCount,
}: MobileSidebarProps) => {
  const { isOpen } = useSidebarStore();

  return (
    <Sheet open={isOpen}>
      <SheetContent
        side="left"
        className="w-screen border-none bg-[#1C1C1F] p-0 pt-8"
      >
        <Sidebar
          className={className}
          isProPlan={isProPlan}
          userLimitCount={userLimitCount}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
