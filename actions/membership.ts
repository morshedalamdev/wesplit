"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { MemberUpdateState, StatusType } from "@/lib/types";
import { MemberUpdateSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function update(state: MemberUpdateState | undefined, formData: FormData):Promise<MemberUpdateState | undefined>{
  const validatedFields = MemberUpdateSchema.safeParse({
    id: formData.get("membershipId"),
    userRole: formData.get("userRole"),
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

  const { id, userRole, role } = validatedFields.data;

  if (!id) redirect("/dashboard");

  const user = await getUser();
  if (!user) redirect("/login");
  if (userRole != "admin")
    return {
      message: "Not Authorized for This Action",
      status: StatusType.WARNING,
    };

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection)
    return {
      message: "Membership Collection Not Found",
      status: StatusType.ERROR,
    };

  membershipCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: {role} }
  );

  return {
    message: "Successfully Updated Member Information",
    status: StatusType.SUCCESS,
  };
}