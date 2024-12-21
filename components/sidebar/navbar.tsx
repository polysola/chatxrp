import { NAVIGATIONS } from "@/constants";
import React from "react";
import Link from "next/link";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const pathname = usePathname();

  return (
    <div className="px-3">
      {NAVIGATIONS.map(({ title, url, icon }) => (
        <div key={url} className="mb-3">
          <Link href={url} onClick={handleClose}>
            <div
              className={cn(
                "flex items-center py-2.5 rounded-xl px-4",
                "hover:bg-gray-800/50 transition-all duration-200",
                "group relative",
                isMinimal && "px-2 justify-center",
                pathname.includes(url) &&
                  "bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-1.5 rounded-lg",
                    pathname.includes(url) &&
                      "bg-gradient-to-r from-purple-500 to-pink-500"
                  )}
                >
                  <Image
                    width={22}
                    height={22}
                    src={icon}
                    alt={title}
                    className={pathname.includes(url) ? "brightness-200" : ""}
                  />
                </div>
                {!isMinimal && (
                  <span
                    className={cn(
                      "text-sm font-medium text-gray-300",
                      pathname.includes(url) && "text-white"
                    )}
                  >
                    {title}
                  </span>
                )}
              </div>

              {pathname.includes(url) && !isMinimal && (
                <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-lg" />
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
