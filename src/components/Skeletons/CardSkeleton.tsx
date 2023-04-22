export default function CardSkeleton() {
  return (
    <>
      <div className="bg-white mb-6 xl:mb-0 shadow-lg dark:bg-gray-800 rounded p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex flex-grow flex-col space-y-6 py-1">
            <div className="flex flex-col w-full space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-5 bg-gray-300 dark:bg-slate-700 rounded-2xl col-span-1"></div>
              </div>
            </div>
            <div className="h-2 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="rounded-full bg-gray-300 dark:bg-slate-700 h-10 w-10"></div>
        </div>
      </div>
    </>
  );
}
