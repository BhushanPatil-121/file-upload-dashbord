import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {theme}  = useTheme();
  return (
    <div
      className={cn(theme==="light"?"animate-pulse rounded-md bg-gray-300":"animate-pulse rounded-md bg-slate-50 bg-opacity-30", className)}
      {...props}
    />
  )
}

export { Skeleton }
