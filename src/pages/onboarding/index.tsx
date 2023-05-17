import Auth from "@/layouts/Auth";
import Known from "@/components/Onboarding/Selection/Known";
import Custom from "@/components/Onboarding/Selection/Custom";

export default function Calibration() {
  

  return (
    <Auth>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dobrodošli! Še zadnji korak...</h2>
        <Known />
      </div>
    </Auth>
  );
}
