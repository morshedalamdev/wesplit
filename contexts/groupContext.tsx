"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {MembershipType, GroupType, RoleType, InvitationType } from "@/lib/types";
import { clear } from "@/actions/invite";

interface GroupContextType {
  group: GroupType | null;
  invitations: InvitationType[] | null;
  memberships: MembershipType[] | null;
  userRole: RoleType | null;
  refreshMemberships: () => void;
  refreshInvitation: () => void;
  refreshGroup: () => void;
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
  const { data: memberships, mutate: mutateMemberships } = useSWR<
    MembershipType[]
  >("/api/groups", fetcher);
  // API CALL: selected group information
  const { data: group, mutate: mutateGroup } = useSWR<GroupType>(
    selectedGroupId ? `/api/groups/${selectedGroupId}` : null,
    fetcher
  );

  // SET: user role for selected group
  const userRole =
    selectedGroupId && memberships
      ? memberships.find((g) => g.groupId == selectedGroupId)?.role || null
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
          await clear(item.inviteId);
        } else {
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
  const refreshMemberships = () =>
    mutateMemberships(undefined, { revalidate: true });
  const value = {
    group: group || null,
    invitations: invitations,
    memberships: memberships || null,
    userRole: userRole as RoleType | null,
    refreshGroup,
    refreshInvitation,
    refreshMemberships,
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