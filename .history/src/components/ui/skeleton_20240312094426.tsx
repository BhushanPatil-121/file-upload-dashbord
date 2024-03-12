import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-400 bg-opacity-7", className)}
      {...props}
    />
  )
}

export { Skeleton }
