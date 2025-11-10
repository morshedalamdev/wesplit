import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
  const user = await getUser();
  if (!user)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const inviteCollection = await getCollection("invites");
  if (!inviteCollection) return NextResponse.json(null);

  const invitations = await inviteCollection
    .aggregate([
      { $match: { email: user.userMail } },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      { $unwind: "$group" },
      {
        $lookup: {
          from: "users",
          localField: "invitedBy",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ])
    .toArray();
  if (!invitations) return NextResponse.json(null);

  const plainData = invitations.map((item) => ({
    invitedId: item._id.toString(),
    groupId: item.groupId.toString(),
    groupName: item.group.name,
    invitedBy: item.user.name,
    role: item.role,
    status: item.status,
    createdAt: item.createdAt.toLocaleDateString(),
    expiresAt: item.expiresAt.toLocaleDateString(),
  }));

  return NextResponse.json(plainData);
}