import {getServerSession}
export const GET = async (req:Request)=>{
    const session = getServerSession(authOptions)
}