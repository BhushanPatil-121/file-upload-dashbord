import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-mdbg-opacity-30", className)}
      {...props}
    />
  )
}

export { Skeleton }
