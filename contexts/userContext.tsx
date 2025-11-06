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
import { UserType } from "@/lib/types";

interface UserContextType {
  userId: string | null;
  userAvatar: string | null;
  userData: UserType | null;
  refreshUser: ()=> void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data } = useSWR<UserType>("/api/auth", fetcher);
  const [userId, setUserId] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    if (data) {
      setUserId(data.id);
      setUserData(data);
      setUserAvatar(
        data?.avatar
          ? `data:image/jpeg;base64,${data.avatar}`
          : "https://github.com/shadcn.png"
      );
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        userId,
        userAvatar,
        userData,
        refreshUser: () => mutate("/api/auth"),
      }}
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
