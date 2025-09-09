import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b w-full p-5 bg-slate-900">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3 border-b bg-slate-900 animate-pulse">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="bg-slate-700 size-12 rounded-full animate-pulse" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="bg-slate-700 h-4 w-32 mb-2 animate-pulse" />
              <div className="bg-slate-700 h-3 w-16 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;