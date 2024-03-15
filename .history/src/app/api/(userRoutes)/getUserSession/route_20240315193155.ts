import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
export  async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session?.user.email);
  return NextResponse.json({ authenticated: !!session , email:session?.user.email});
}
