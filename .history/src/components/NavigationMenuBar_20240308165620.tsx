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
    <div className="w-full flex justify-end">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
           <LightDarkModeToggle/>
           <LightDarkModeToggle/>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
