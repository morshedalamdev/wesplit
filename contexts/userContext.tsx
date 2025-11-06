"use client";

import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { UserType } from "@/lib/types";

interface UserContextType {
  userAvatar: string;
  userData: UserType | null;
  refreshUser: ()=> void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {

  // API CALL: all user information
  const { data: user, mutate: mutateUser } = useSWR<UserType>("/api/auth", fetcher);

  const value = {
    userAvatar: user?.avatar
      ? `data:image/jpeg;base64,${user.avatar}`
      : "https://github.com/shadcn.png",
    userData: user || null,
    refreshUser: mutateUser,
  };
  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
