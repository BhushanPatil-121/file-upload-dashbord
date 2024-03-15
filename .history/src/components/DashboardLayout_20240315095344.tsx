
import React, { Children, FC, ReactNode, useState } from "react";
import NavBar from "@/components/NavBar";
import { Divider } from "@mui/material";
import Provider from "@/components/Provider";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

interface CommanLayoutProps{
  children:ReactNode;
}
const  DashboardLayout:FC<CommanLayoutProps> = ({children}) => {
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    {
      name: "users",
      link: "/dashboard/admin",
      icon: AiOutlineUser,
      margin: true,
    },
    // { name: "messages", link: "/", icon: FiMessageSquare },
    // { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Files", link: "/dashboard/files", icon: FiFolder },
    // { name: "Cart", link: "/", icon: FiShoppingCart },
    // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    // { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
  //  {/* <div
  //     className={`h-screen grid ${
  //       open ? "grid-cols-[240px_1fr]" : "grid-cols-[60px_1fr]"
  //     } max-md:grid-cols-[60px_1fr]   duration-500 grid-rows-[60px_1fr]  `}
  //   >
  //     <section className="col-[1/2] row-[1/3] text-gray-900 px-4 ">
  //       <div className="py-3 flex justify-end">
  //         <HiMenuAlt3
  //           size={26}
  //           className="cursor-pointer max-md:disabled "
  //           onClick={() => setOpen(!open)}
  //         />
  //       </div>
  //       <div className="mt-4 flex flex-col gap-4 relative">
  //         {menus?.map((menu, i) => (
  //           <Link
  //             href={menu?.link}
  //             key={i}
  //             className={` ${
  //               menu?.margin && "mt-5"
  //             } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}
  //           >
  //             <div>{React.createElement(menu?.icon, { size: "20" })}</div>
  //             <h2
  //               style={{
  //                 transitionDelay: `150ms`,
  //               }}
  //               className={`whitespace-pre  ${
  //                 !open && "opacity-0    overflow-hidden"
  //               } max-md:invisible `}
  //             >
  //               {open&& menu?.name}
  //             </h2>
  //             <h2
  //               className={`${
  //                 open && "hidden"
  //               } absolute left-24 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
  //             >
  //               {menu?.name}
  //             </h2>
  //           </Link>
  //         ))}
  //       </div>
  //     </section>
  //     <header className=" col-[2/3] row-[1/2]">
  //       <NavBar/>
  //     </header>
  //     <main className="bg-[#f2edf3] col-[2/3] row-[2/3] p-3 overflow-auto ">
  //       {children}
  //       </main>
  //   </div> */}
  )
}

export default DashboardLayout;