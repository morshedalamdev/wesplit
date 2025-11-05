"use client";

import { LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import GroupDrawer from "./create/GroupDrawer";
import { logout } from "@/actions/auth";
import { showToast } from "@/lib/utils/showToast";
import { redirect } from "next/navigation";

export default function Sidebar() {
  const handleLogout = async () => {
    const res = await logout();
    showToast(res?.message, res?.status);
    redirect("/login");
  };

  return (
    <aside className="w-12 h-[calc(100vh-48px)] py-4 flex flex-col justify-between items-center x-bg-glass border-r border-white">
      <div className="flex flex-col gap-3 items-center">
        <Link href="/dashboard/group/1">
          <UserAvatar />
        </Link>
      </div>
      <div className="flex flex-col gap-3 items-center border-t border-white pt-3">
        <Link href="/dashboard/settings">
          <Button size="icon" className="rounded-full">
            <Settings />
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          size="icon"
          className="rounded-full bg-red-600"
        >
          <LogOut />
        </Button>
      </div>
    </aside>
  );
}
