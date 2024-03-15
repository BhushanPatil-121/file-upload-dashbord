import {getServerSession}from 'next-auth'
import {authOptions} from "@/lib/auth"
import {NextResponse} from "next/server"
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
    log
    return NextResponse.json({authenticated: !!session})
}