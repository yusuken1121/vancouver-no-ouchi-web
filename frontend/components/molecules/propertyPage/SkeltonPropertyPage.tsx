import { Skeleton } from "@/components/ui/skeleton";

const PropertyPageSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-64" />
      <div className="max-w-[1200px] lg:h-[60lvh] flex flex-col lg:flex-row mx-auto">
        <div className="w-full lg:w-[60%] py-8 lg:pr-2">
          <Skeleton className="w-3/4 h-8 mb-4" />{" "}
          <div className="space-y-4">
            <Skeleton className="w-full h-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <Skeleton className="h-20" key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[40%] py-8 lg:pl-2">
          <div className="flex flex-col justify-between items-center bg-slate-100 rounded-lg p-2 lg:h-full h-[50lvh]">
            <Skeleton className="w-full h-16 mb-4" />{" "}
            <Skeleton className="w-full h-10" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPageSkeleton;
