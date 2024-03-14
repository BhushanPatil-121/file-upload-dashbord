import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
export default  function ProfileAvatar() {
  const{data:session}=useSession()
  lg
  return(<Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>);
}
