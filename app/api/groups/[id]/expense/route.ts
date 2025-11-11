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

  const expenseCollection = await getCollection("expenses");
  if (!expenseCollection) return NextResponse.json(null);

  const expenses = await expenseCollection
    .aggregate([
      { $match: { groupId: new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "payerId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ])
    .toArray();
  if (!expenses) return NextResponse.json(null);

  const plainData = expenses.map((item) => ({
    expenseId: item._id.toString(),
    groupId: item.groupId.toString(),
    payer: item.user.name,
    payerId: item.payerId,
    title: item.title,
    amount: item.amount,
    split: item.split,
    notes: item?.notes,
    receipt: item?.receipt,
    date: formatDate(item.date),
  }));

  return NextResponse.json(plainData);
}