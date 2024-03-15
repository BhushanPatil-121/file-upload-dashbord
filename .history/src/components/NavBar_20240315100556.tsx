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

export default function NavBar() {
  const { theme } = useTheme()
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 px-2">
      <div className="max-w-screen flex flex-row flex-wrap items-center justify-between mx-auto p-3">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Upload
        </span>
        <div className="flex gap-4 justify-center items-center ">
        <LightDarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <Avatar>
              <AvatarImage c src="https://github.com/shadcn1.png" />
              <AvatarFallback>{session?.user.name?.slice(0,1)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
