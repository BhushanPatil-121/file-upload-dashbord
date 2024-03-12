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
      className={cn(", className)}
      {...props}
    />
  )
}

export { Skeleton }
