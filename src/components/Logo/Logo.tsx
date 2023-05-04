import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <div className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
        <div className="flex items-center justify-center">
          Watt
          <Image src="/lightning.svg" alt="4" className="px-1 animate-pulse" width={30} height={30} />
          Cast
        </div>
      </div>
    </>
  );
}
