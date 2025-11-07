"use client";

import { accept, clear } from "@/actions/invite";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGroup } from "@/contexts/groupContext";
import { InvitationType, MembershipType } from "@/lib/types";

export default function Page() {
  const { memberships, invitations, refreshInvitation, refreshMemberships } = useGroup();

  const handleRejection = async (id: string) => {
    await clear(id);
    refreshInvitation();
  };
  const handleAcceptation = async (inviteId: string, groupId: string, role: string) =>{
    await accept(inviteId, groupId, role);
    refreshInvitation();
    refreshMemberships();
  }
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
        {memberships && memberships?.length > 0 ? (
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
              {memberships.map((g: MembershipType) => (
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
        ) : (
          <p className="text-center p-2">No Group in List</p>
        )}
      </div>
      <div className="x-bg-glass-dark basis-0 grow">
        {invitations && invitations?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invited Group</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Invited Date</TableHead>
                <TableHead>Expire In</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations.map((i: InvitationType) => (
                <TableRow key={i.inviteId}>
                  <TableCell>{i.groupName}</TableCell>
                  <TableCell>{i.invitedBy}</TableCell>
                  <TableCell>{i.createdAt}</TableCell>
                  <TableCell>7 days</TableCell>
                  <TableCell className="flex gap-2">
                    <button
                      onClick={() => handleAcceptation(i.inviteId, i.groupId, i.role)}
                      className="text-green-600"
                    >
                      Accept
                    </button>
                    |
                    <button
                      onClick={() => handleRejection(i.inviteId)}
                      className="text-red-500"
                    >
                      Reject
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center p-2">No Group in List</p>
        )}
      </div>
    </section>
  );
}
