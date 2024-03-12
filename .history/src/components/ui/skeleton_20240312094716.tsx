"use client"
import { cn } from "@/lib/utils"
import { useTheme } from "@emotion/react"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {theme}  = useTheme();
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-700 bg-opacity-50", className)}
      {...props}
    />
  )
}

export { Skeleton }
