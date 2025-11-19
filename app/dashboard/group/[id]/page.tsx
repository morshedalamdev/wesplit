"use client";

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
import { ExpenseType, GroupMemberType } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Group() {
  const params = useParams();
  const groupId = params.id as string;
    const { allExpenses } = useExpense();
  const { selectGroup, groupMembers } = useGroup();

  useEffect(() => {
    selectGroup(groupId);
  }, [groupId, selectGroup]);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="x-bg-glass-dark px-3 py-2 space-y-1">
          <h4 className="font-medium">Total Expenses</h4>
          <p className="text-xl font-bold">1,250.00/-</p>
        </div>
        <div className="x-bg-glass-dark px-3 py-2 space-y-1">
          <h4 className="font-medium">Total Settle</h4>
          <p className="text-xl font-bold">1,250.00/-</p>
        </div>
        <div className="x-bg-glass-dark px-3 py-2 space-y-1">
          <h4 className="font-medium">Total Due</h4>
          <p className="text-xl font-bold">1,250.00/-</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="x-bg-glass-dark basis-0 grow">
          {groupMembers && groupMembers?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sl</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupMembers &&
                  groupMembers.map((g: GroupMemberType, index: number) => (
                    <TableRow key={g.membershipId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{g.name}</TableCell>
                      <TableCell>{g.role}</TableCell>
                      <TableCell>{g.joinedAt}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center p-2">No Members in List</p>
          )}
        </div>
        <div className="x-bg-glass-dark">
          <h3 className="font-semibold text-sm text-center px-3 py-2 border-b border-gray-200">
            Your Summary
          </h3>
          <Table className="font-medium">
            <TableBody>
              <TableRow>
                <TableCell>Expenses</TableCell>
                <TableCell>1,200/-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Own</TableCell>
                <TableCell>1,200/-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Due</TableCell>
                <TableCell>1,200/-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Settle</TableCell>
                <TableCell>1,200/-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="x-bg-glass-dark">
        {allExpenses && allExpenses?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allExpenses.map((e: ExpenseType, index: number) => (
                <TableRow key={e.expenseId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.amount}/-</TableCell>
                  <TableCell>{e.quantity ? e.quantity : "---"}</TableCell>
                  <TableCell>{e.payer}</TableCell>
                  <TableCell>{e.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center p-2">No Expenses in List</p>
        )}
      </div>
    </>
  );
}
