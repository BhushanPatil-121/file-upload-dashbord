import {getServerSession}from 'next-auth'
import {authOptions} from "@/lib/auth"

export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
    return NextResponse.json(session)
}