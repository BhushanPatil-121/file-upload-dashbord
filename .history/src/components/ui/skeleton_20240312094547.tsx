import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-500 bg-opacity-10", className)}
      {...props}
    />
  )
}

export { Skeleton }
