import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import Image from "next/image";
import { Button } from "../ui/button";
import { X } from "lucide-react";
const SidebarToggle = () => {
  const { isMinimal, handleChangeSideBar, handleOpenOrClose, handleClose } =
    useSidebarStore();
  return (
    <div>
      <div
        className={cn("cursor-pointer hidden lg:block")}
        onClick={handleChangeSideBar}
        is-navbar-minimal={isMinimal ? "true" : undefined}
      >
        {/* tạo folder ở public */}
        <Image
          src={`/menu-${isMinimal ? "open" : "open"}.png`}
          alt="navbar-icon"
          width={46}
          height={46}
        />
      </div>

      <Button
        onClick={handleClose}
        variant="ghost"
        className="lg:hidden"
        size="icon"
      >
        <X></X>
      </Button>
    </div>
  );
};

export default SidebarToggle;
