"use client";

import { createContext, ReactNode, useContext,} from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ExpenseType } from "@/lib/types";
import { useGroup } from "./groupContext";

interface ExpenseContextType {
  allExpenses: ExpenseType[] | null;
  refreshAllExpenses: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
     const {selectedGroup} = useGroup();
     
  // API CALL: all invitations
  const { data: allExpenses, mutate: mutateExpenses } = useSWR<
    ExpenseType[]
  >(selectedGroup ? `/api/groups/${selectedGroup}/expense` : null, fetcher);

  // Refresh API Calls
  const refreshAllExpenses = () => mutateExpenses(undefined, { revalidate: true });

  const value = { allExpenses: allExpenses || null, refreshAllExpenses };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export const useExpense = ()=>{
  const context = useContext(ExpenseContext);

  if (!context) throw new Error("useGroup must be used within ExpenseProvider");
  return context;
}