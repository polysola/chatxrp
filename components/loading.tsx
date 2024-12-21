import { Brain, Sparkles, CircuitBoard, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

const Loading = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-4 bg-slate-900/50 py-3 px-4 rounded-lg">
      {/* Left Icon */}
      <div className="relative">
        <Brain className="animate-pulse text-sky-400" size={24} />
        <Sparkles
          className="absolute -top-1 -right-1 text-sky-300 animate-bounce"
          size={12}
        />
      </div>

      {/* Text with Animated Dots */}
      <div className="flex items-center">
        <span className="text-sm font-medium text-sky-400">Processing</span>
        <span className="text-sky-400 w-6 text-sm">{dots}</span>
      </div>

      {/* Right Side Animation */}
      <Cpu className="animate-spin text-sky-500/50" size={20} />
    </div>
  );
};

export default Loading;
