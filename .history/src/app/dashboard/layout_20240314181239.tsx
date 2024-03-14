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
import Provider from "@/components/Provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <Provider>
      
    </Provider>
  );
}
