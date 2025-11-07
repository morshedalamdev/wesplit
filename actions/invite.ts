"use server";

import crypto from "crypto";
import bcrypt from "bcrypt";
import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { InviteState, StatusType } from "@/lib/types";
import { InviteSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function invite(state: InviteState | undefined, formData: FormData): Promise<InviteState | undefined>{
  const validatedFields = InviteSchema.safeParse({
    id: formData.get("id"),
    email: formData.get("email"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      role: formData.get("role"),
    };
  }

  const { id, email, role } = validatedFields.data;

  if (!id) redirect("/dashboard");

  const user = await getUser();
  if (!user) redirect("/login");

  const inviteCollection = await getCollection("invites");
  if (!inviteCollection)
    return {
      message: "Membership Collection Not Found",
      status: StatusType.ERROR,
    };

  const existing = await inviteCollection.findOne({
    email,
    groupId: new ObjectId(id),
  });
  if (existing)
    return {
      errors: { email: ["User Already Invited to The Group"] },
      message: "User Already Invited to The Group",
      status: StatusType.WARNING,
      role,
    };

    const randomText = crypto.randomBytes(16).toString("hex");
    const hashedText = await bcrypt.hash(randomText, 10);

  const result = await inviteCollection.insertOne({
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    groupId: new ObjectId(id),
    invitedBy: new ObjectId(user.userId),
    token: hashedText,
    email,
    role,
    status: "pending",
  });

  if (!result.acknowledged)
    return {
      message: "An Error Occurred While Creating Group",
      status: StatusType.ERROR,
      role,
    };

  return {
    message: "Invitation Sended",
    status: StatusType.SUCCESS,
  };
}

export async function clear(id: string):Promise<void>{
  const user = await getUser();
  if (!user) redirect("/login");
  
  const inviteCollection = await getCollection("invites");
  if (!inviteCollection) revalidatePath("/dashboard");

  await inviteCollection?.findOneAndDelete({ _id: new ObjectId(id) });
  revalidatePath("/dashboard");
}

export async function accept(
  inviteId: string,
  groupId: string,
  role: string
): Promise<void> {
  const user = await getUser();
  if (!user) redirect("/login");

  const inviteCollection = await getCollection("invites");
  if (!inviteCollection) revalidatePath("/dashboard");

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection) revalidatePath("/dashboard");

  const membership = await membershipCollection?.insertOne({
    joinedAt: new Date(),
    groupId: new ObjectId(groupId),
    userId: new ObjectId(user.userId),
    role,
  });

  if(membership?.acknowledged){
    inviteCollection?.findOneAndUpdate(
      { _id: new ObjectId(inviteId) },
      {
        $set: {
          status: "accepted",
        },
      }
    );
  }
}