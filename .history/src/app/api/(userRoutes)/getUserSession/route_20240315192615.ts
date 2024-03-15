import {getServerSession}from 'next-auth'
import {authOptions}
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
}