"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {MembershipType, GroupType, RoleType } from "@/lib/types";

interface GroupContextType {
  group: GroupType | null;
  memberships: MembershipType[] | null;
  userRole: RoleType | null;
  refreshMemberships: () => void;
  refreshGroup: () => void;
  selectGroup: (id: string | null) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // API CALL: all memberships group
  const { data: memberships, mutate: mutateMemberships } = useSWR<MembershipType[]>("/api/groups",fetcher);
  // API CALL: selected group information
  const { data: group, mutate: mutateGroup} = useSWR<GroupType>(`/api/groups/${selectedGroupId}`, fetcher);
  // SET: user role for selected group
  const userRole = selectedGroupId && memberships ? memberships.find((g)=> g.groupId == selectedGroupId)?.role || null : null;

  const value = {
    group: group || null,
    memberships: memberships || null,
    userRole: userRole as RoleType | null,
    refreshGroup: mutateGroup,
    refreshMemberships: mutateMemberships,
    selectGroup: setSelectedGroupId,
  };
  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
}

export const useGroup = ()=>{
  const context = useContext(GroupContext);

  if (!context) throw new Error("useGroup must be used within GroupProvider");
  return context;
}