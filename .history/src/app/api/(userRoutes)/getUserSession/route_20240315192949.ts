import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
export default async function GET = async(req: Request) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return NextResponse.json({ authenticated: !!session });
};
