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

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection) return NextResponse.json(null);

  const members = await membershipCollection
    .aggregate([
      { $match: { groupId: new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ])
    .toArray();
  if (!members) return NextResponse.json(null);
  
const plainData = members.map((item) => ({
    membershipId: item._id.toString(),
    memberId: item.userId.toString(),
    name: item.user.name,
    role: item.role,
    joinedAt: item.joinedAt?.toLocaleDateString(),
  }));

  return NextResponse.json(plainData);
}