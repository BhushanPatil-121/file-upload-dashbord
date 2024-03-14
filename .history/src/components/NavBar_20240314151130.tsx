import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 flex flex-row justify-center items-center">
      <div className="max-w-screen flex flex-row flex-wrap items-center justify-between mx-auto ">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite
        </span>
        {/* <div className="flex justify-center items-center"> */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        {/* </div> */}
      </div>
    </nav>
  );
}
