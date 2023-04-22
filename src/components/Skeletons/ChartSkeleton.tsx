export default function ChartSkeleton() {
  return (
    <>
      <div>
        <div
          role="status"
          className="flex items-center justify-center h-[420px] w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
        >
          <span className="material-symbols-rounded material-font-size-9xl text-gray-200 dark:text-gray-600">
            query_stats
          </span>
          <span className="sr-only">Loading...</span>
        </div>
        <div role="status" className="flex items-center justify-center w-full mt-5 space-x-2 animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-40"></div>
        </div>
      </div>
    </>
  );
}
