"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGroup } from "@/contexts/groupContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Group() {
  const params = useParams();
  const groupId = params.id as string;
  const { selectGroup } = useGroup();

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
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell>October 13, 2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Editor</TableCell>
                <TableCell>November 5, 2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Mike Johnson</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>December 1, 2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>Emily Davis</TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell>January 10, 2026</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payer</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>150.00/-</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>October 13, 2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Office Supplies</TableCell>
              <TableCell>300.00/-</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>November 5, 2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Team Outing</TableCell>
              <TableCell>500.00/-</TableCell>
              <TableCell>Mike Johnson</TableCell>
              <TableCell>December 1, 2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>Snacks</TableCell>
              <TableCell>200.00/-</TableCell>
              <TableCell>Emily Davis</TableCell>
              <TableCell>January 10, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>Software Subscription</TableCell>
              <TableCell>100.00/-</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>February 15, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>Travel Expenses</TableCell>
              <TableCell>400.00/-</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>March 22, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>Conference Fees</TableCell>
              <TableCell>250.00/-</TableCell>
              <TableCell>Mike Johnson</TableCell>
              <TableCell>April 18, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>8</TableCell>
              <TableCell>Marketing Materials</TableCell>
              <TableCell>350.00/-</TableCell>
              <TableCell>Emily Davis</TableCell>
              <TableCell>May 30, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>9</TableCell>
              <TableCell>Client Gifts</TableCell>
              <TableCell>150.00/-</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>June 12, 2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10</TableCell>
              <TableCell>Website Hosting</TableCell>
              <TableCell>80.00/-</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>July 8, 2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
