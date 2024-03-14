import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { AvatarImage } from "./ui/avatar";
export default async function ProfileAvatar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return 
  <AvatarImage>
      <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </AvatarImage>
}
