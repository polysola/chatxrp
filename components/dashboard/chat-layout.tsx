interface ChatLayoutProps {
  children: React.ReactNode;
  input: React.ReactNode;
}

const ChatLayout = ({ children, input }: ChatLayoutProps) => {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-xl overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth">
        {children}
      </div>

      {/* Input Container */}
      <div className="border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-lg p-4">
        <div className="max-w-4xl mx-auto">{input}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
