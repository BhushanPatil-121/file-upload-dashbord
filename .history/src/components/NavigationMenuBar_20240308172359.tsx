import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { LightDarkModeToggle } from "./LightDarkModeToggle";

export default function NavigationMenuBar() {
  return (
    <header class='shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] relative'>
    <div class='flex flex-wrap items-center justify-between gap-5'>
      <a href="javascript:void(0)"
        class="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"><img
          src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-36' />
      </a>
      <div class='flex items-center ml-auto lg:order-1'>
        <button class='mr-6 font-semibold text-[15px] border-none outline-none'><a href='javascript:void(0)'
            class='text-[#007bff] hover:underline'>Login</a></button>
        <button
          class='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Sign
          up</button>
        <button id="toggle" class='lg:hidden ml-7'>
          <svg class="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <ul id="collapseMenu" class='lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full'>
        <li class='max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded'>
          <a href='javascript:void(0)'
            class='lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]'>Home</a>
        </li>
        <li class='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'><a href='javascript:void(0)'
            class='lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Team</a>
        </li>
        <li class='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'><a href='javascript:void(0)'
            class='lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Feature</a>
        </li>
        <li class='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'><a href='javascript:void(0)'
            class='lg:hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Blog</a>
        </li>
      </ul>
    </div>
  </header>
  );
}