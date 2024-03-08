
import Image from "next/image";

export default function NavigationMenuBar() {
  return (
    <header className="w- shadow-lg p-2 sm:px-10 bg-white font-[sans-serif] min-h-[50px] fixed">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <a
          href="javascript:void(0)"
          className="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <Image
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            width={100}
            height={20}
          />
        </a>
        <div className="flex items-center ml-auto lg:order-1">
          <button className="mr-6 font-semibold text-[15px] border-none outline-none">
            <a
              href="javascript:void(0)"
              className="text-[#007bff] hover:underline"
            >
              Login
            </a>
          </button>
          <button className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
            Sign up
          </button>
        </div>

      </div>
    </header>
  );
}
