import DefaultLayout from "@/layouts/DefaultLayout";

export default function Community() {
  return (
    <DefaultLayout>
      
      <div className="flex pt-10 text-center justify-center bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Community
          </span>{' '}
        </h1>
      </div>


    </DefaultLayout>
  );
}
