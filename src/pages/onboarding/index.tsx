import Auth from "@/layouts/Auth";
import Known from "@/components/Onboarding/Selection/known";

export default function Calibration() {
  

  return (
    <Auth>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dobrodošli! Še zadnji korak...</h2>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Prosimo, da naslednje podatke izpolnite z največjo možnjo natančnostjo. <br />
          To nam bo pomagalo, da vam zagotovimo najboljšo izkušnjo.
        </div>
        <Known />
      </div>
    </Auth>
  );
}
