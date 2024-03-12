import { cn } from "@/lib/utils"
import { useTheme } from "next-themes";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {theme}  = useTheme();
  return (
    <div
      className={cn(theme==="light" ? "animate-pulse rounded-md bg-gray-700 bg-opacity-70":"animate-pulse rounded-md bg-slate-50 bg-opacity-30", className)}
      {...props}
    />
  )
}

export { Skeleton }
