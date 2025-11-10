"use client";

import { LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import GroupDrawer from "./create/GroupDrawer";
import { logout } from "@/actions/auth";
import { showToast } from "@/lib/utils/showToast";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useGroup } from "@/contexts/groupContext";
import { AllGroupType } from "@/lib/types";

export default function Sidebar() {
  const { allGroups } = useGroup();

  const handleLogout = async () => {
    const res = await logout();
    showToast(res?.message, res?.status);
    redirect("/login");
  };

  return (
    <aside className="w-12 h-[calc(100vh-48px)] py-4 flex flex-col justify-between items-center x-bg-glass border-r border-white">
      <div className="flex flex-col gap-3 items-center">
        {allGroups != null &&
          allGroups.map((g: AllGroupType) => (
            <Link key={g?.groupId} href={`/dashboard/group/${g?.groupId}`}>
              {g?.groupAvatar ? (
                <Image
                  src={`data:image/jpeg;base64,${g.groupAvatar}`}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500" />
              )}
            </Link>
          ))}
        <GroupDrawer />
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
