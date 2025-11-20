import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import formatDate from "@/lib/utils/formatDate";
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

  const settleCollection = await getCollection("settlements");
  if (!settleCollection) return NextResponse.json(null);

  const settlements = await settleCollection
    .aggregate([
      { $match: { groupId: new ObjectId(id) } },
      {
        $lookup: {
          from: "expenses",
          localField: "expenseId",
          foreignField: "_id",
          as: "expenseInfo",
        },
      },
      {
        $unwind: "$expenseInfo",
      },
      {
        $lookup: {
          from: "users",
          localField: "fromUserId",
          foreignField: "_id",
          as: "fromUser",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "toUserId",
          foreignField: "_id",
          as: "toUser",
        },
      },
      {
        $unwind: "$fromUser",
      },
      {
        $unwind: "$toUser",
      },
    ])
    .toArray();

  const plainData = settlements.map((item)=>({
     settlementId: item._id.toString(),
     expenseId: item.expenseId.toString(),
     groupId: item.groupId.toString(),
     fromUserId: item.fromUserId.toString(),
     fromUser: item.fromUser.name,
     toUserId: item.toUserId.toString(),
     toUser: item.toUser.name,
     amount: item.amount,
     currency: item.currency,
     method: item.method,
     settledAt: formatDate(item.settledAt),
     notes: item.notes,
     title: item.expenseInfo.title,
  }));
  
  return NextResponse.json(plainData);
}