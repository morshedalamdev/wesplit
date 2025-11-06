import { getUserId } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const userId = await getUserId();
  if (!userId)
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_BASE_URL)
    );

  const groupCollection = await getCollection("groups");
  if (!groupCollection) return NextResponse.json(null);

  const group = await groupCollection.findOne({_id: new ObjectId(id)});
  if(!group) return NextResponse.json(null);

  const plainData = {
    groupId: group._id.toString(),
    name: group.name,
    settings: {
      currency: group.settings.currency,
      defaultSplit: group.settings.defaultSplit,
    },
    description: group?.description,
  };

  return NextResponse.json(plainData);
}