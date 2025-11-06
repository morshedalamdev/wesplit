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
import { MembershipType } from "@/lib/types";

export default function Page() {
  const { memberships } = useGroup();

  return (
    <section className="flex flex-col gap-3">
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
      <div className="x-bg-glass-dark basis-0 grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="w-20">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberships &&
              memberships.map((g: MembershipType) => (
                <TableRow key={g.groupId}>
                  <TableCell>{g.name}</TableCell>
                  <TableCell>{g.role}</TableCell>
                  <TableCell>{g.joinedAt}</TableCell>
                  <TableCell>
                    <button className="text-red-500">Remove</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="x-bg-glass-dark basis-0 grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invited Group</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Invited Date</TableHead>
              <TableHead>Expire In</TableHead>
              <TableHead className="w-24">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Viewer</TableCell>
              <TableCell>October 13, 2025</TableCell>
              <TableCell>7 days</TableCell>
              <TableCell className="flex gap-2">
                <button className="text-green-600">Accept</button>|
                <button className="text-red-500">Delete</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Editor</TableCell>
              <TableCell>November 5, 2025</TableCell>
              <TableCell>7 days</TableCell>
              <TableCell className="flex gap-2">
                <button className="text-green-600">Accept</button>|
                <button className="text-red-500">Delete</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mike Johnson</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>December 1, 2025</TableCell>
              <TableCell>7 days</TableCell>
              <TableCell className="flex gap-2">
                <button className="text-green-600">Accept</button>|
                <button className="text-red-500">Delete</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Emily Davis</TableCell>
              <TableCell>Viewer</TableCell>
              <TableCell>January 10, 2026</TableCell>
              <TableCell>7 days</TableCell>
              <TableCell className="flex gap-2">
                <button className="text-green-600">Accept</button>|
                <button className="text-red-500">Delete</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
