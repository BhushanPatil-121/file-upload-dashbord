import React from "react";
import { authOptions } from '@/lib/auth'
import {getServerSession } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 px-2">
      <div className="max-w-screen flex flex-row flex-wrap items-center justify-between mx-auto p-3">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite
        </span>
        {/* <div className="flex justify-center items-center"> */}

        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:ring-0">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{session}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3 ">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* </div> */}
      </div>
    </nav>
  );
}
