"use client"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {theme}  = useTheme();
  return (
    <div
      className={cn(theme==="light"?"animate-pulse rounded-md bg-gray-300 bg-opacity-50":"animate-pulse rounded-md bg- bg-opacity-50", className)}
      {...props}
    />
  )
}

export { Skeleton }
