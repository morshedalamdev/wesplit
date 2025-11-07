"use server";

import crypto from "crypto";
import bcrypt from "bcrypt";
import { getUserId } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { InviteState, StatusType } from "@/lib/types";
import { InviteSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

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

  const userId = await getUserId();
  if (!userId) redirect("/login");

  const inviteCollection = await getCollection("invites");
  if (!inviteCollection)
    return {
      message: "Membership Collection Not Found",
      status: StatusType.ERROR,
    };

  const existing = await inviteCollection.findOne({
    email,
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
    invitedBy: new ObjectId(userId),
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
}