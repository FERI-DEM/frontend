import CardSkeleton from './CardSkeleton';
import ChartSkeleton from './ChartSkeleton';
import SidebarSkeleton from './SidebarSkeleton';

export default function DashboardSkeleton() {
  return (
    <>
      <div className={`h-screen bg-gray-50 dark:bg-gray-900`}>
        <SidebarSkeleton />
        <div className="relative md:ml-64 bg-gray-50 dark:bg-gray-900">
          <div className="px-4 pt-6">
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              <div className="2xl:col-span-2">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <div role="status" className="flex items-center justify-between mb-4 w-full animate-pulse">
                    <div className="flex flex-col">
                      <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-28 mb-2.5"></div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-60"></div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
                  </div>

                  <ChartSkeleton />

                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                    <div role="status" className="w-full animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32"></div>
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <div className="mb-3">
                  <CardSkeleton />
                </div>

                <div className="mb-3">
                  <CardSkeleton />
                </div>

                <div className="mb-3">
                  <CardSkeleton />
                </div>

                <div className="mb-3">
                  <CardSkeleton />
                </div>

                <div className="mb-3">
                  <CardSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
