"use client";

import { ChartNoAxesGantt, LayoutGrid, Settings2, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useGroup } from "@/contexts/groupContext";

export default function Navbar () {
  const pathname = usePathname();
  const { group, userRole } = useGroup();

  return (
    <nav className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between p-2 x-bg-glass-dark">
      <Link
        className="x-nav-item x-nav-active"
        href={`/dashboard/group/${group?.groupId}`}
      >
        <Button
          size="icon"
          className={`${
            pathname.endsWith(`${group?.groupId}`)
              ? "bg-amber-400 hover:bg-amber-400"
              : ""
          }`}
        >
          <LayoutGrid />
        </Button>
      </Link>
      <Link
        className="x-nav-item"
        href={`/dashboard/group/${group?.groupId}/expenses`}
      >
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
      <Link
        className="x-nav-item"
        href={`/dashboard/group/${group?.groupId}/settlements`}
      >
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
      <Link
        className="x-nav-item"
        href={`/dashboard/group/${group?.groupId}/members`}
      >
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
      {userRole && userRole == "admin" ? (
        <Link
          className="x-nav-item"
          href={`/dashboard/group/${group?.groupId}/settings`}
        >
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
      ) : (
        ""
      )}
    </nav>
  );
}