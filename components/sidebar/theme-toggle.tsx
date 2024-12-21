"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { THEME_MODES } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { isMinimal } = useSidebarStore();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "p-2 rounded-xl flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 w-full",
        isMinimal && "w-14 h-14 justify-center"
      )}
    >
      {isMinimal ? (
        <span className="text-gray-300">
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </span>
      ) : (
        THEME_MODES.map(({ label, value }) => (
          <span
            key={value}
            className={cn(
              "flex items-center p-2 rounded-lg px-6 w-full justify-center cursor-pointer text-gray-400",
              theme === value && "bg-gray-900/70 text-white"
            )}
          >
            {value === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            <span className="ml-2 text-sm font-medium">{label}</span>
          </span>
        ))
      )}
    </div>
  );
};

export default ThemeToggle;
