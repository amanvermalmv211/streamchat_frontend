const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(15).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`${idx % 2 === 0 ? "place-self-start" : "place-self-end"}`}>
          <div className="flex items-end space-x-2">
            <div className="bg-slate-900 w-10 h-10 rounded-full animate-pulse" />

            <div>
              <div className="bg-slate-900 h-4 w-16 animate-pulse mb-1 rounded-sm" />

              <div className="bg-slate-900 h-12 w-[200px] animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;