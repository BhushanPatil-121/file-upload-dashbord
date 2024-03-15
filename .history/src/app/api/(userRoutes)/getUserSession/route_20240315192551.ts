import {getServerSession}from 'next-auth'
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
}