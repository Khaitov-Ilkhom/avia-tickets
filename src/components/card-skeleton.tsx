import { Skeleton } from "@/components/ui/skeleton";

export function FlightCardSkeleton() {
  return (
      <div className="bg-card rounded-3xl p-5 border border-border shadow-sm space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="space-y-2">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>

          <div className="flex-1 px-8 space-y-2">
            <div className="flex justify-center">
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
            <Skeleton className="h-[2px] w-full rounded-full" />
          </div>

          <div className="space-y-2 text-right">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md ml-auto" />
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
  );
}