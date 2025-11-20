import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET( req: Request, {params}: {params: {id: string}} ) {
  const { id } = await params;

  const user = await getUser();
  if (!user)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const settleCollection = await getCollection("settlements");
  if (!settleCollection) return NextResponse.json(null);

  const settlement = await settleCollection.findOne({
    expenseId: new ObjectId(id),
    fromUserId: new ObjectId(user.userId),
  });
  if (settlement) return NextResponse.json(null);

  const expenseCollection = await getCollection("expenses");
  if (!expenseCollection) return NextResponse.json(null);

  const expense = await expenseCollection
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "payerId",
          foreignField: "_id",
          as: "payerInfo",
        },
      },
      {
        $unwind: "$payerInfo",
      },
    ])
    .next();
  if (!expense) return NextResponse.json(null);

  const plainData = {
    expenseId: expense._id.toString(),
    groupId: expense.groupId.toString(),
    toUserId: expense.payerId.toString(),
    toUser: expense.payerInfo?.name,
    amount: expense.participants.find(
      (p: any) => p.userId.toString() === user.userId
    )?.owed,
  };
  return NextResponse.json(plainData);
}