import { authOptions } from '@/lib/auth'
import {getServerSession } from "next-auth"
export default async function ProfileAvatar() {
    const session  = await getServerSession(authOptions)
console.log(session);
  return (
    <div>
        
    </div>
  )
}
