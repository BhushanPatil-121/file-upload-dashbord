import {getServerSession}from 'next-auth'
import 
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
}