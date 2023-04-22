import Logo from '../Logo/Logo';

export default function SidebarSkeleton() {
  return (
    <>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <Logo />
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <li role="status" className="flex max-w-sm p-3 rounded shadow animate-pulse">
                  <span className="flex p-2 rounded-lg group h-2 w-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                  <span className="flex ml-4 p-2 rounded-lg group h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                </li>
                <li role="status" className="flex max-w-sm p-3 rounded shadow animate-pulse">
                  <span className="flex p-2 rounded-lg group h-2 w-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                  <span className="flex ml-4 p-2 rounded-lg group h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                </li>
                <li role="status" className="flex max-w-sm p-3 rounded shadow animate-pulse">
                  <span className="flex p-2 rounded-lg group h-2 w-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                  <span className="flex ml-4 p-2 rounded-lg group h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                </li>
                <li role="status" className="flex max-w-sm p-3 rounded shadow animate-pulse">
                  <span className="flex p-2 rounded-lg group h-2 w-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                  <span className="flex ml-4 p-2 rounded-lg group h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-14 mb-3 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800 max-w-sm p-3 rounded shadow animate-pulse">
            <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          </div>

          <div className="absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800">
            <div role="status" className="animate-pulse">
              <div className="flex items-center mt-4 space-x-3">
                <svg
                  className="text-gray-200 w-10 h-10 dark:text-gray-700"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
