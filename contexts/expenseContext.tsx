"use client";

import { createContext, ReactNode, useContext, useEffect, useState,} from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ExpenseType, SettleExpenseType, SettlementType } from "@/lib/types";
import { useGroup } from "./groupContext";

interface ExpenseContextType {
  allExpenses: ExpenseType[] | null;
  expenseSettleList: ExpenseType[] | null;
  allSettlements: SettlementType[] | null;
  selectedExpense: SettleExpenseType | null;
  selectExpense: (id: string | null) => void;
  refreshSelectedExpense: () => void;
  refreshAllExpenses: () => void;
  refreshAllSettlements: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
     const {selectedGroup} = useGroup();
     const [expenseSettleList, setExpenseSettleList] = useState<ExpenseType[] | null>(null);
     const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);
     
  // API CALL: all invitations
  const { data: allExpenses, mutate: mutateExpenses } = useSWR<
    ExpenseType[]
  >(selectedGroup ? `/api/groups/${selectedGroup}/expense` : null, fetcher);
  // API CALL: all settlements
  const { data: allSettlements, mutate: mutateSettlements } = useSWR<SettlementType[]>(
    selectedGroup ? `/api/groups/${selectedGroup}/settlement` : null,
    fetcher
  );
  // API CALL: selected expense
  const { data: selectedExpense, mutate: mutateSelectedExpense } = useSWR<SettleExpenseType>(
    selectedExpenseId ? `/api/expenses/${selectedExpenseId}` : null,
    fetcher
  );
  
  // SET: settle list
  useEffect(() => {
    const data = allExpenses?.filter((e) => e.owed > 0) || null;
    setExpenseSettleList(data);
  }, [allExpenses]);

  // Refresh API Calls
  const refreshAllExpenses = () => mutateExpenses(undefined, { revalidate: true });
  const refreshAllSettlements = () => mutateSettlements(undefined, { revalidate: true });
  const refreshSelectedExpense = () => mutateSelectedExpense(undefined, { revalidate: true });

  const value = {
    allExpenses: allExpenses || null,
    selectedExpense: selectedExpense || null,
    allSettlements: allSettlements || null,
    expenseSettleList,
    refreshAllExpenses,
    refreshAllSettlements,
    refreshSelectedExpense,
    selectExpense: setSelectedExpenseId,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export const useExpense = ()=>{
  const context = useContext(ExpenseContext);

  if (!context) throw new Error("useGroup must be used within ExpenseProvider");
  return context;
}