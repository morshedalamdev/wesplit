"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MemberDrawer from "@/components/create/MemberDrawer";
import { useGroup } from "@/contexts/groupContext";
import { GroupMemberType, StatusType } from "@/lib/types";
import EditMemberDrawer from "@/components/create/EditMemberDrawer";
import { deleteMember } from "@/actions/membership";
import { showToast } from "@/lib/utils/showToast";

export default function Members () {
  const { refreshGroupMember, userRole, groupMembers } = useGroup();
  
    const handleDelete = async (id: string) => {
      const result = await deleteMember(id, userRole);
      if (result?.message) showToast(result.message, result?.status);
      if (result?.status == StatusType.SUCCESS) refreshGroupMember();
    };

  return (
    <div className="x-bg-glass-dark">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <h3 className="font-medium text-sm">Members</h3>
        <div className="flex items-center gap-2">
          {userRole == "admin" && <MemberDrawer />}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Join</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Settle</TableHead>
            <TableHead>Due</TableHead>
            {userRole == "admin" && (
              <TableHead className="w-24">Action</TableHead>
            )}
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
                <TableCell>250.00/-</TableCell>
                <TableCell>100.00/-</TableCell>
                <TableCell>150.00/-</TableCell>
                {userRole == "admin" && (
                  <TableCell className="flex gap-2">
                    <EditMemberDrawer data={g}>
                      <button className="text-amber-500">Edit</button>
                    </EditMemberDrawer>
                    |<button onClick={()=>handleDelete(g.membershipId)} className="text-red-500">Delete</button>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}