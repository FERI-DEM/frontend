import React, { ReactNode } from "react";

interface CardBasicProps {
  children: ReactNode;
  title: string;
  buttonTitle?: string;
  onButtonClick?: () => void | Promise<void>;
  modalTarget?: string;
}

const CardBasic = ({ children, title, buttonTitle, onButtonClick, modalTarget }: CardBasicProps) => {
  return (
    <div className="mr-4 h-min min-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">{children}</div>
    </div>
  );
};

export default CardBasic;
