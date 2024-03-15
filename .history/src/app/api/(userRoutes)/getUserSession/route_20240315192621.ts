import {getServerSession}from 'next-auth'
import {authOptions} from "@/lib/"
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
}