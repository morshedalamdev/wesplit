import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const user = await getUser();
  if (!user)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const groupCollection = await getCollection("groups");
  if (!groupCollection) return NextResponse.json(null);

  const group = await groupCollection
  .aggregate([
    { $match: { _id: new ObjectId(id) } },
    {
      $lookup: {
        from: "memberships",
        localField: "_id",
        foreignField: "groupId",
        as: "members",
      },
    },
    { $unwind: { path: "$members", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "users",
        localField: "members.userId",
        foreignField: "_id",
        as: "members.user",
      },
    },
    { $unwind: { path: "$members.user", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        groupAvatar: { $first: "$groupAvatar" },
        description: { $first: "$description" },
        ownerId: { $first: "$ownerId" },
        settings: { $first: "$settings" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        members: { $push: "$members" },
      },
    },
  ])
  .next();
  if(!group) return NextResponse.json(null);

  const members = group.members.map((m: any) => ({
  userId: m.userId.toString(),
  name: m.user.name,
}));

  const plainData = {
    groupId: group._id.toString(),
    name: group.name,
    settings: {
      currency: group.settings.currency,
      defaultSplit: group.settings.defaultSplit,
    },
    description: group?.description,
    groupAvatar: group?.groupAvatar,
    members
  };

  return NextResponse.json(plainData);
}