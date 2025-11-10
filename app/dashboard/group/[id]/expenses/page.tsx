"use client";

import ExpenseDrawer from "@/components/create/ExpenseDrawer";
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
import { ExpenseType } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Expenses() {
  const { allExpenses } = useExpense();

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
                <TableHead>Payer</TableHead>
                <TableHead>Method</TableHead>
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
                  <TableCell>{e.amount}</TableCell>
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
                      <button className="text-green-500">View</button>|
                      <button className="text-amber-500">Edit</button>|
                      <button className="text-red-500">Delete</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between p-2 border-t border-gray-200">
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
          </div>
        </>
      ) : (
        <p className="text-center p-2">No Expenses in List</p>
      )}
    </div>
  );
}
