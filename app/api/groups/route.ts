import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import formatDate from "@/lib/utils/formatDate";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(){
  const user = await getUser();
  if (!user)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection) return NextResponse.json(null);

  const groups = await membershipCollection
    .aggregate([
      { $match: { userId: new ObjectId(user.userId) } },
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
    joinedAt: formatDate(item.joinedAt),
    groupAvatar: item.group?.groupAvatar,
  }));

  return NextResponse.json(plainData);
}