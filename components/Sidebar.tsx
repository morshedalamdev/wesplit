"use client";

import { LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import GroupDrawer from "./create/GroupDrawer";
import { logout } from "@/actions/auth";
import { showToast } from "@/lib/utils/showToast";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getGroups } from "@/actions/group";
import Image from "next/image";
import { GroupType } from "@/lib/types";

export default function Sidebar() {
  const [groups, setGroups] = useState<GroupType[] | null>(null);

useEffect(()=>{
  const fetch = async ()=>{
    const data = await getGroups();
    setGroups(data);
  }

  fetch();
},[])

  const handleLogout = async () => {
    const res = await logout();
    showToast(res?.message, res?.status);
    redirect("/login");
  };

  return (
    <aside className="w-12 h-[calc(100vh-48px)] py-4 flex flex-col justify-between items-center x-bg-glass border-r border-white">
      <div className="flex flex-col gap-3 items-center">
        {groups !== null &&
          groups.map((group) => (
            <Link key={group?._id} href={`/dashboard/group/${group?._id}`}>
              {group?.groupAvatar ? (
                <Image
                  src={`data:image/jpeg;base64,${group.groupAvatar}`}
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
