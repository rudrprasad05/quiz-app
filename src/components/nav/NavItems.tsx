"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

import { cn } from "@/lib/utils";

const NavItems = ({ classname }: { classname?: string }) => {
  const { data } = useSession();
  const user = data?.user;
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  const checkRole = () => {
    return user?.role == "SELLER" || user?.role == "ADMIN";
  };

  return (
    <div className={cn("flex gap-4 h-full", classname)} ref={navRef}>
      <div className="flex items-center">
        <Link
          href={"/"}
          className={`${buttonVariants({ variant: "ghost" })}text-sm`}
        >
          Home
        </Link>
      </div>
      {/* dashboard */}
      {checkRole() && (
        <div className="flex items-center">
          <Link
            href={`/admin`}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Dashboard
          </Link>
        </div>
      )}

      {/* adminm panel */}
      {user?.role == "ADMIN" && (
        <div className="flex items-center">
          <Link
            href={"/superadmin"}
            className={`${buttonVariants({ variant: "ghost" })}text-sm`}
          >
            Admin Panel
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavItems;
