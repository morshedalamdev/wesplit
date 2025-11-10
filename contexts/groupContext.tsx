"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {AllGroupType, GroupType, RoleType, InvitationType, GroupMemberType } from "@/lib/types";
import { clearMember } from "@/actions/invite";

interface GroupContextType {
  group: GroupType | null;
  invitations: InvitationType[] | null;
  allGroups: AllGroupType[] | null;
  userRole: RoleType | null;
  groupMembers: GroupMemberType[] | null;
  refreshAllGroups: () => void;
  refreshInvitation: () => void;
  refreshGroup: () => void;
  refreshGroupMember: () => void;
  selectGroup: (id: string | null) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [invitations, setInvitations] = useState<InvitationType[] | null>(null);

  // API CALL: all invitations
  const { data: inviteData, mutate: mutateInvitations } = useSWR<
    InvitationType[]
  >("/api/invite", fetcher);
  // API CALL: all memberships group
  const { data: allGroups, mutate: mutateAllGroups } = useSWR<
    AllGroupType[]
  >("/api/groups", fetcher);
  // API CALL: selected group information
  const { data: group, mutate: mutateGroup } = useSWR<GroupType>(
    selectedGroupId ? `/api/groups/${selectedGroupId}` : null,
    fetcher
  );
  // API CALL: selected group members
  const { data: groupMembers, mutate: mutateMembers } = useSWR<GroupMemberType[]>(
    selectedGroupId ? `/api/memberships/${selectedGroupId}` : null,
    fetcher
  );

  // SET: user role for selected group
  const userRole =
    selectedGroupId && allGroups
      ? allGroups.find((g) => g.groupId == selectedGroupId)?.role || null
      : null;

  useEffect(() => {
    const handleInvitations = async () => {
      if (!inviteData) return;
      const updatedInvitation: InvitationType[] = [];

      for (const item of inviteData) {
        const expiresAt = new Date(item.expiresAt);
        const now = new Date();
        const diff = expiresAt.getTime() - now.getTime();
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (diffDays < -1 && item.status == "pending") {
          // clear the invitation if it expires
          await clearMember(item.invitedId);
          break;
        }
        if (item.status == "pending"){
          updatedInvitation.push({
            ...item,
            expiresAt: diffDays,
          });
        }
      }
      setInvitations(updatedInvitation);
    };

    handleInvitations();
  }, [inviteData]);

  // Refresh API Calls
  const refreshGroup = () => mutateGroup(undefined, { revalidate: true });
  const refreshInvitation = () =>
    mutateInvitations(undefined, { revalidate: true });
  const refreshAllGroups = () =>
    mutateAllGroups(undefined, { revalidate: true });
  const refreshGroupMember = () => mutateMembers(undefined, {revalidate: true})
  const value = {
    group: group || null,
    invitations: invitations,
    allGroups: allGroups || null,
    userRole: userRole as RoleType | null,
    groupMembers: groupMembers || null,
    refreshGroup,
    refreshInvitation,
    refreshAllGroups,
    refreshGroupMember,
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