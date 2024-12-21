import BotAvatar from "../chat/bot-avatar";

interface AiResponseProps {
  children: React.ReactNode;
}

const AiResponse = ({ children }: AiResponseProps) => {
  return (
    <div className="flex gap-4 max-w-4xl mx-auto group">
      <BotAvatar />
      <div className="flex-1 bg-gradient-to-br from-zinc-900/50 via-fuchsia-900/10 to-zinc-800/50 rounded-2xl p-4 backdrop-blur-sm border border-fuchsia-500/10 shadow-[0_0_15px_rgba(192,132,252,0.1)] transition-all duration-300 group-hover:border-fuchsia-500/20 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default AiResponse;
