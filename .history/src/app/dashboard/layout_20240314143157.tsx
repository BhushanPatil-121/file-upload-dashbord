"use client";
import React, { Children, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { Divider } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "user", link: "/dashboard/admin", icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`h-screen grid ${
        open ? "grid-cols-[250px_1fr]" : "grid-cols-[64px_1fr]"
      } duration-500 grid-rows-[60px_1fr]  `}
    >
      <section className="col-[1/2] row-[1/3] text-gray-900 px-4 ">
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer md "
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `150ms`,
                }}
                className={`whitespace-pre duration-150 ${
                  !open && "opacity-0    overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-24 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </section>
      <header className=" col-[2/3] row-[1/2]">
        <NavBar/>
      </header>
      <main className="bg-green-500 col-[2/3] row-[2/3]">{children}</main>
    </div>
    // <section className="flex overflow-hidden h-screen">
    //   <div
    //     className={`bg-[#ffffff] min-h-screen ${
    //       open ? "w-72" : "w-16"
    //     } duration-500 text-gray-900 px-4 `}
    //   >
    //     <div className="py-3 flex justify-end">
    //       <HiMenuAlt3
    //         size={26}
    //         className="cursor-pointer"
    //         onClick={() => setOpen(!open)}
    //       />
    //     </div>
    //     <div className="mt-4 flex flex-col gap-4 relative">
    //       {menus?.map((menu, i) => (
    //         <Link
    //           href={menu?.link}
    //           key={i}
    //           className={` ${
    //             menu?.margin && "mt-5"
    //           } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}
    //         >
    //           <div>{React.createElement(menu?.icon, { size: "20" })}</div>
    //           <h2
    //             style={{
    //               transitionDelay: `150ms`,
    //             }}
    //             className={`whitespace-pre duration-150 ${
    //               !open && "opacity-0    overflow-hidden"
    //             }`}
    //           >
    //             {menu?.name}
    //           </h2>
    //           <h2
    //             className={`${
    //               open && "hidden"
    //             } absolute left-24 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
    //           >
    //             {menu?.name}
    //           </h2>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="flex flex-col bg-[#f2edf3]  text-xl text-gray-900 font-semibold w-auto overflow-hidden">
    //     <NavBar />
    //     <div className="flex flex-col overflow-hidden bg-[#ca49f5]  text-xl text-gray-900 font-semibold w-screen p-3 ">
    //       {children}
    //     </div>
    //   </div>
    // </section>
  );
}
