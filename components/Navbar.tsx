"use client";

import { ChartNoAxesGantt, LayoutGrid, Settings2, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar () {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between p-2 x-bg-glass-dark">
      <Link className="x-nav-item x-nav-active" href={`/group/1`}>
        <Button
          size="icon"
          className={`${
            pathname.endsWith("/1") ? "bg-amber-400 hover:bg-amber-400" : ""
          }`}
        >
          <LayoutGrid />
        </Button>
      </Link>
      <Link className="x-nav-item" href={`/dashboard/group/1/expenses`}>
        <Button
          size="icon"
          className={`${
            pathname.endsWith("/expenses")
              ? "bg-amber-400 hover:bg-amber-400"
              : ""
          }`}
        >
          <ShoppingCart />
        </Button>
      </Link>
      <Link className="x-nav-item" href={`/dashboard/group/1/settlements`}>
        <Button
          size="icon"
          className={`${
            pathname.endsWith("/settlements")
              ? "bg-amber-400 hover:bg-amber-400"
              : ""
          }`}
        >
          <ChartNoAxesGantt />
        </Button>
      </Link>
      <Link className="x-nav-item" href={`/dashboard/group/1/members`}>
        <Button
          size="icon"
          className={`${
            pathname.endsWith("/members")
              ? "bg-amber-400 hover:bg-amber-400"
              : ""
          }`}
        >
          <Users />
        </Button>
      </Link>
      <Link className="x-nav-item" href={`/dashboard/group/1/settings`}>
        <Button
          size="icon"
          className={`${
            pathname.endsWith("/settings")
              ? "bg-amber-400 hover:bg-amber-400"
              : ""
          }`}
        >
          <Settings2 />
        </Button>
      </Link>
    </nav>
  );
}