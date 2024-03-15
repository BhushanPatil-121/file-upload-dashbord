"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutBtn from "./SignOutBtn";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { LightDarkModeToggle } from "./LightDarkModeToggle";
import Link from "next/link";
import { Card } from "./ui/card";

export default function NavBar() {
  const { theme } = useTheme()
  const { data: session } = useSession();
  console.log(session);
  return (

    <Card className="mx-">
      <nav className="bg-inherit  ">
      <div className="max-w-screen flex flex-row flex-wrap items-center justify-between mx-auto p-3">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Upload
        </span>
        <div className="flex gap-4 justify-center items-center ">
        <LightDarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <Avatar className="border-inherit border-2">
              <AvatarImage className="bg-inherit" src="https://github.com/shadcn1.png" />
              <AvatarFallback>{session?.user.name?.slice(0,1)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={"/dashboard/profile"} > Profile </Link></DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </nav>
    </Card>
  );
}
