"use client";

import { deleteExpense } from "@/actions/expense";
import ExpenseDrawer from "@/components/create/ExpenseDrawer";
import EditExpense from "@/components/edit/EditExpense";
import ExpenseView from "@/components/ExpenseView";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useExpense } from "@/contexts/expenseContext";
import { useGroup } from "@/contexts/groupContext";
import { useUser } from "@/contexts/userContext";
import { ExpenseType, StatusType } from "@/lib/types";
import { showToast } from "@/lib/utils/showToast";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Expenses() {
  const { userData } = useUser();
  const { userRole } = useGroup();
  const { allExpenses, refreshAllExpenses } = useExpense();

  const handleDelete = async (expenseId: string, payerId: string) => {
    const result = await deleteExpense(expenseId, payerId, userRole);
    if (result?.message) showToast(result.message, result?.status);
    if (result?.status == StatusType.SUCCESS) refreshAllExpenses();
  };

  return (
    <div className="x-bg-glass-dark">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <h3 className="font-medium text-sm">Expenses</h3>
        <div className="flex items-center gap-2">
          {userRole !== "viewer" && <ExpenseDrawer />}
        </div>
      </div>
      {allExpenses && allExpenses?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Owed</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allExpenses.map((e: ExpenseType, index: number) => (
                <TableRow key={e.expenseId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.amount}/-</TableCell>
                  <TableCell>{e.owed}/-</TableCell>
                  <TableCell>
                    {e.payerId == userData?.userId ? "You" : e.payer}
                  </TableCell>
                  <TableCell>{e.quantity ? e.quantity : "---"}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ExpenseView data={e} />|
                      {userData?.userId == e.payerId ? (
                        <>
                          <EditExpense data={e} /> |
                        </>
                      ) : (
                        ""
                      )}
                      {userData?.userId == e.payerId ||
                      userRole == "admin" ||
                      userRole == "contributor" ? (
                        <button
                          onClick={() => handleDelete(e.expenseId, e.payerId)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <p className="text-center p-2">No Expenses in List</p>
      )}
    </div>
  );
}
