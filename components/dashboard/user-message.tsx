import UserAvatar from "../chat/user-avatar";

interface UserMessageProps {
  children: React.ReactNode;
}

const UserMessage = ({ children }: UserMessageProps) => {
  return (
    <div className="flex gap-4 max-w-4xl mx-auto group">
      <UserAvatar />
      <div className="flex-1 bg-gradient-to-br from-zinc-800/50 via-purple-900/10 to-zinc-900/50 rounded-2xl p-4 backdrop-blur-sm border border-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all duration-300 group-hover:border-purple-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default UserMessage;
