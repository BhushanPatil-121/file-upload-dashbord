import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {theme}
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-700 bg-opacity-50", className)}
      {...props}
    />
  )
}

export { Skeleton }
