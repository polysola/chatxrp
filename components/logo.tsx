interface LogoProps {
  className?: string;
}

import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";
import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <a href="../" className={cn("flex items-center", className)}>
      {/* <BrainCircuit color='#0ea5e9' size={40} /> */}

      <Image
        src="/logo.png"
        width={40}
        height={40}
        alt="logo"
        className="rounded"
      />

      <span className={cn("ml-2 font-bold text-2xl", poppins.className)}>
        Chat XRP
      </span>
    </a>
  );
};

export default Logo;
