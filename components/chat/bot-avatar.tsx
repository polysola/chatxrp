import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
