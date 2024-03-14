import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default async function ProfileAvatar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return 
  <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallbackk>CN</AvatarFallbackk>
            </Avatar>
}
