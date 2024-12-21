import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  imageUrl?: string;
  fallback?: string;
}

const UserAvatar = ({ imageUrl, fallback = "U" }: UserAvatarProps) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={imageUrl || "/avatars/default-user.png"} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
