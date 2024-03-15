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

export default function NavBar() {
  const { theme } = useTheme()
  const { data: session } = useSession();
  console.log(session);
  return (

    <Card>
      
    </Card>
  );
}
