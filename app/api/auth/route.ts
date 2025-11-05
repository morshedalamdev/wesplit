import { getUserId } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(){
  const userCollection = await getCollection("users");
  if (!userCollection) return NextResponse.json(null);

  const userId = await getUserId();
  if (!userId) redirect("/login");

  const data = await userCollection.findOne({
    _id: new ObjectId(userId),
  });

  return NextResponse.json({
    id: data?._id?.toString(),
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    description: data?.description,
    avatar: data?.avatar,
  });
}