import { getUserId } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(){
  const userId = await getUserId();
  if (!userId)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection) return NextResponse.json(null);

  const groups = await membershipCollection
    .aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      { $unwind: "$group" },
    ])
    .toArray();

  const plainData = groups.map((item) => ({
    groupId: item.groupId.toString(),
    name: item.group.name,
    role: item.role,
    joinedAt: item.joinedAt?.toLocaleDateString(),
    groupAvatar: item.group?.groupAvatar,
  }));

  return NextResponse.json(plainData);
}