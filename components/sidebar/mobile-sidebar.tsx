"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import Sidebar from ".";
import { useSidebarStore } from "@/store/sidebar-store";

const MobileSidebar: React.FC<{ className?: string }> = ({ className }) => {
  const { isOpen } = useSidebarStore();

  return (
    <Sheet open={isOpen}>
      <SheetContent
        side="left"
        className="w-screen border-none bg-black p-0 pt-8"
      >
        <Sidebar className={className} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
