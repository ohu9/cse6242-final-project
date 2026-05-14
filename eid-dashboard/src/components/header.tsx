"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useAuth } from "./auth/AuthProvider";

export function Header() {
    // const { user, isLoading, checkAuth, logout } = useAuth();

    return (
        <NavigationMenu className="sticky top-0 z-50 bg-white shadow-md">
            <NavigationMenuList className="flex-wrap px-6 py-4 border-b-2 w-[100vw] justify-start gap-5">
                <NavigationMenuItem>
                <Link href="/dashboard">
                    <b>🌎 EID Classifier</b>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/analytics">
                            Analytics
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            {/* add more NavigationmenuList components to add other header items */}
        </NavigationMenu>
    );
}
