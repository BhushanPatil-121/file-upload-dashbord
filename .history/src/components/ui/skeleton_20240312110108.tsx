import { cn } from "@/lib/utils"
import { useTheme } from "next-themes";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {theme}  = useTheme();
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-500 bg-opacity-70", className)}
      {...props}
    />
  )
}

export { Skeleton }
