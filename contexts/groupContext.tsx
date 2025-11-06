"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import { GroupType, GroupsType, RoleType } from "@/lib/types";

interface GroupContextType {
  groups: GroupsType[] | null;
  refreshMembership: () => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const { data: groupsData } = useSWR("api/groups", fetcher);
  const [groups, setGroups] = useState<GroupsType[] | null>(null)
  const [currency, setCurrency] = useState<string | null>(null);
  const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
  const [memberRole, setMemberRole] = useState<RoleType | null>(null);

  useEffect(() => {
    if (groupsData) {
      setGroups(groupsData);
    }
  }, [groupsData]);

  return (
    <GroupContext.Provider
      value={{
        groups,
        refreshMembership: () => mutate("/api/membership")
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export const useGroup = ()=>{
  const context = useContext(GroupContext);

  if (!context) throw new Error("useGroup must be used within GroupProvider");
  return context;
}