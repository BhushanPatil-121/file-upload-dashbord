import Image from "next/image";
import React from "react";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-row flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite
        </span>
        d
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite
        </span>
        </div>
        {/* <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      </div> */}
    </nav>
  );
}
