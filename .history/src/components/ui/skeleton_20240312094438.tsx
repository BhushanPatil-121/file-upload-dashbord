import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-800-400 bg-opacity-70", className)}
      {...props}
    />
  )
}

export { Skeleton }
