import Image from "next/image";

export default function NavigationMenuBar() {
  return (
    <header className="min-w-full shadow-lg p-2 sm:px-10 bg-white font-[sans-serif] min-h-[50px] fixed">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
        <h2 className="text-center text-bold font-extrabold relative after:absolute after:-bottom-5 after:h-1 after:w-1/2 after:bg-gray-400 after:left-0 after:right-0 after:mx-auto after:rounded-full">
            U
          </h2>
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
