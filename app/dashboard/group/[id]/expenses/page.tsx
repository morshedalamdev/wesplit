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
          <ExpenseDrawer />
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
                <TableHead>Method</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Receipt</TableHead>
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
                  <TableCell className="capitalize">{e.split}</TableCell>
                  <TableCell>{e.payer}</TableCell>
                  <TableCell>
                    {e?.receipt ? (
                      <Image
                        src={`data:image/jpeg;base64,${e.receipt}`}
                        alt={e.title}
                        width={41}
                        height={41}
                      />
                    ) : (
                      "---"
                    )}
                  </TableCell>
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
                      <button onClick={()=>handleDelete(e.expenseId, e.payerId)} className="text-red-500">Delete</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <div className="flex items-center justify-between p-2 border-t border-gray-200">
            <p className="text-muted-foreground">1-20 expenses are showing</p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                className="text-muted-foreground"
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="text-muted-foreground"
              >
                <ArrowRight />
              </Button>
            </div>
          </div> */}
        </>
      ) : (
        <p className="text-center p-2">No Expenses in List</p>
      )}
    </div>
  );
}
