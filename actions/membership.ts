"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { MemberUpdateState, StatusType } from "@/lib/types";
import { MemberUpdateSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function updateMember(state: MemberUpdateState | undefined, formData: FormData):Promise<MemberUpdateState | undefined>{
  const validatedFields = MemberUpdateSchema.safeParse({
    membershipId: formData.get("membershipId"),
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

  const { membershipId, userRole, role } = validatedFields.data;

  if (!membershipId) redirect("/dashboard");

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
    { _id: new ObjectId(membershipId) },
    { $set: {role} }
  );

  return {
    message: "Successfully Updated Member Information",
    status: StatusType.SUCCESS,
  };
}

export async function deleteMember(
  membershipId: string | undefined,
  userRole: string | null
): Promise<{ message: string; status: StatusType } | undefined> {
  const user = await getUser();
  if (!user) redirect("/login");

  if (!membershipId)
    return {
      message: "Member not Found in Database",
      status: StatusType.ERROR,
    };
  if (userRole != "admin")
    return {
      message: "Not Authorized for This Action",
      status: StatusType.WARNING,
    };

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
    };
  await membershipCollection?.findOneAndDelete({ _id: new ObjectId(membershipId) });

  return {
    message: "Successfully Deleted The Group",
    status: StatusType.SUCCESS,
  };
}