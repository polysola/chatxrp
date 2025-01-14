"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

interface SubscriptionButtonProps {
  className?: string;
  isPro?: boolean;
  title?: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  className,
  isPro,
  title = "Buy Now",
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleSubcribe = async () => {
    try {
      window.open(
        "https://firstledger.net",
        "_blank"
      );

      return;
      setLoading(true);
      const {} = await axios.get("/api/stripe");
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong !",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center items-center mt-4", className)}>
      <Button
        variant="outline"
        size="lg"
        disabled={loading}
        onClick={handleSubcribe}
        className={cn(
          "text-white w-full font-semibold border-none gradient-btn",
          "hover:text-white w-40 "
        )}
      >
        <span>{title}</span>
        <Image
          src="/leger.jpg"
          width={20}
          height={20}
          alt="logo"
          className="rounded ml-2 "
        />
        {/* <Sparkles/> */}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
