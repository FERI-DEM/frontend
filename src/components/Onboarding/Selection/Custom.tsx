import React, { useState } from 'react';

export default function Custom() {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event:any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                Prosimo, izberite velikost vaše elektrarne.
            </h3>
            <div className="grid w-full gap-6 md:grid-cols-1">
                {/* Code for the first option */}
                <li>
                <input
                    type="radio"
                    id="hosting-small"
                    name="hosting"
                    value="hosting-small"
                    className="hidden peer"
                    required
                    onChange={handleOptionChange}
                />
                <label
                    htmlFor="hosting-small"
                    className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 ${
                    selectedOption === 'hosting-small'
                        ? 'text-green-500 border-green-600'
                        : 'dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                >
                    <div className="block">
                    <div className="w-full text-lg font-semibold">Mala - do 20 kW</div>
                    </div>
                    <svg
                    aria-hidden="true"
                    className="w-6 h-6 ml-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                </label>
                </li>
            </div>
        </>
    )
}