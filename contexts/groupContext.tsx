import { createContext, ReactNode, useContext, useState } from "react";
import { GroupType, RoleType } from "../types";

interface GroupContextType {
  groupId: string | null;
  currency: string | null;
  groupAvatar: string | null;
  memberRole: RoleType | null;
  groupData: GroupType | null;
  setGroupId: (_id: string | null) => void;
  setCurrency: (name: string | null) => void;
  setGroupAvatar: (base: string | null) => void;
  setMemberRole: (role: RoleType | null) => void;
  setGroupData: (group: GroupType | null) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
  const [memberRole, setMemberRole] = useState<RoleType | null>(null);
  const [groupData, setGroupData] = useState<GroupType | null>(null);

  return (
    <GroupContext.Provider
      value={{
        groupId,
        currency,
        groupAvatar,
        memberRole,
        groupData,
        setGroupId,
        setCurrency,
        setGroupAvatar,
        setMemberRole,
        setGroupData,
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