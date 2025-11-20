"use client";

import { deleteSettlement } from "@/actions/settlement";
import SettleDrawer from "@/components/create/SettleDrawer";
import EditSettlement from "@/components/edit/EditSettlement";
import SettleView from "@/components/SettleView";
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
import { SettlementType, StatusType } from "@/lib/types";
import { showToast } from "@/lib/utils/showToast";
import { ArrowLeft, ArrowRight, Edit } from "lucide-react";

export default function Settlements() {
  const { userData } = useUser();
  const { userRole } = useGroup();
  const {allSettlements, refreshAllSettlements} = useExpense();

  const handleDelete = async (settlementId: string, fromUserId: string) => {
    const result = await deleteSettlement(settlementId, fromUserId, userRole);
    if (result?.message) showToast(result.message, result?.status);
    if (result?.status == StatusType.SUCCESS) refreshAllSettlements();
  };

  return (
    <div className="x-bg-glass-dark">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <h3 className="font-medium text-sm">Settlements</h3>
        <div className="flex items-center gap-2">
          <SettleDrawer />
        </div>
      </div>
      {allSettlements && allSettlements.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSettlements.map((s: SettlementType, index: number) => (
                <TableRow key={s.settlementId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{s.amount}</TableCell>
                  <TableCell>{s.fromUser}</TableCell>
                  <TableCell>{s.toUser}</TableCell>
                  <TableCell className="capitalize">{s.method}</TableCell>
                  <TableCell>{s.settledAt}</TableCell>
                  <TableCell className="flex gap-2">
                    <SettleView data={s} />|
                    {userData?.userId == s.fromUserId ? (
                      <>
                        <EditSettlement data={s} /> |
                      </>
                    ) : (
                      ""
                    )}
                    {userData?.userId == s.fromUserId ||
                    userRole == "admin" ||
                    userRole == "contributor" ? (
                      <button
                        onClick={() => handleDelete(s.settlementId, s.fromUserId)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <p className="text-center p-2">No Expenses in List</p>
      )}
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
    </div>
  );
}
