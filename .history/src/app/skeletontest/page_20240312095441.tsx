import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function page() {
  return (
    <div className="mt-16">
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  );
}
