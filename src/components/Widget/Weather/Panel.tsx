import { useState } from 'react';

type PanelProps = {
  title: string;
  children: React.ReactNode;
  onSwitchToggle: (isSwitchOn: boolean) => void;
};

const Panel = ({ title, children, onSwitchToggle }: PanelProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchToggle = () => {
    const updatedSwitch = !isSwitchOn;
    setIsSwitchOn(updatedSwitch);
    onSwitchToggle(updatedSwitch);
  };

  return (
    <>
      <div className="flex flex-wrap items-center">
        <div className="relative w-full pt-4 max-w-full flex-grow flex-1 ml-4">
          <h5 className="text-slate-400 uppercase font-bold text-xs">{title}</h5>
        </div>
        <div className="relative w-full pr-4 pt-2 max-w-full flex-grow flex-1 flex items-center justify-end">
          <button className="bg-gray-200 rounded-full p-1" onClick={handleSwitchToggle}>
            {isSwitchOn ? (
              <svg fill="currentColor" className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
              </svg>
            ) : (
              <svg fill="currentColor" className="h-5 w-5 text-blue-800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
        {children}
      </div>
      <p className="text-sm text-slate-400 mt-4 mr-2 text-end">
        <span className="whitespace-nowrap text-xs">
          Vir: <a href="https://open-meteo.com/">Open-Meteo</a>
        </span>
      </p>
    </>
  );
};

export { Panel };
