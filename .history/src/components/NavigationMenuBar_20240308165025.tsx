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
    <div>
      <NavigationMenu className="al">
        <NavigationMenuList>
          <NavigationMenuItem>
           <LightDarkModeToggle/>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
