import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(){
  const userCollection = await getCollection("users");
  if (!userCollection) return NextResponse.json(null);

  const user = await getUser();
  if (!user)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const data = await userCollection.findOne({ _id: new ObjectId(user.userId) });

  return NextResponse.json({
    id: data?._id?.toString(),
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    description: data?.description,
    avatar: data?.avatar,
  });
}