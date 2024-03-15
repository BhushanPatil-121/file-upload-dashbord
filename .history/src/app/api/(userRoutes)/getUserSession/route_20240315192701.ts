import {getServerSession}from 'next-auth'
import {authOptions} from "@/lib/auth"
import {NextResponse}
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
    return NextResponse.json(session)
}