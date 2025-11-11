"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { GroupState, StatusType } from "@/lib/types";
import { imageToBase64 } from "@/lib/utils/imageConvert";
import { GroupSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createGroup(state: GroupState | undefined, formData: FormData): Promise<GroupState | undefined> {
  const validatedFields = GroupSchema.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    split: formData.get("split"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      name: formData.get("name"),
      currency: formData.get("currency"),
      split: formData.get("split"),
    };
  }

  const { name, currency, split } = validatedFields.data;
  const user = await getUser();
  if (!user) redirect("/login");

  const groupCollection = await getCollection("groups");
  if (!groupCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
      name,
      currency,
      split,
    };

  const existingGroup = await groupCollection.findOne({
    name,
    ownerId: new ObjectId(user.userId),
  });
  if (existingGroup)
    return {
      errors: { name: ["try with another name"] },
      message: "The Group Already Exists",
      status: StatusType.WARNING,
      currency,
      split,
    };

  const group = await groupCollection.insertOne({
    createdAt: new Date(),
    name,
    ownerId: new ObjectId(user.userId),
    settings: {
      currency,
      defaultSplit: split,
    },
  });

  if (!group.acknowledged)
    return {
      message: "An Error Occurred While Creating Group",
      status: StatusType.ERROR,
      name,
      currency,
      split,
    };

  const membershipCollection = await getCollection("memberships");
  if (!membershipCollection)
    return {
      message: "Membership Collection Error",
      status: StatusType.ERROR,
    };

  const membership = await membershipCollection.insertOne({
    joinedAt: new Date(),
    groupId: group.insertedId,
    userId: new ObjectId(user.userId),
    role: "admin",
  });

  if (!membership.acknowledged)
    return {
      message: "An Error Occurred While Creating Membership",
      status: StatusType.ERROR,
    };

  return { message: "Successfully Create Group", status: StatusType.SUCCESS };
}

export async function updateGroup(
  state: GroupState | undefined,
  formData: FormData
): Promise<GroupState | undefined> {
  const validatedFields = GroupSchema.safeParse({
    groupId: formData.get("groupId"),
    role: formData.get("userRole"),
    name: formData.get("name"),
    currency: formData.get("currency"),
    split: formData.get("split"),
    avatar: formData.get("avatar"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      name: formData.get("name"),
      currency: formData.get("currency"),
      split: formData.get("split"),
      avatar: formData.get("avatar"),
      description: formData.get("description"),
    };
  }

  const { groupId, role, name, currency, split, avatar, description } = validatedFields.data;
  let data;

  if (avatar?.size > 0) {
    const convertedAvatar = await imageToBase64(avatar);
    data = {
      name,
      description,
      groupAvatar: convertedAvatar,
      updatedAt: new Date(),
      settings: {
        currency,
        defaultSplit: split,
      },
    };
  } else {
    data = {
      name,
      description,
      updatedAt: new Date(),
      settings: {
        currency,
        defaultSplit: split,
      },
    };
  }

  if (!groupId) redirect("/dashboard");
  if (role != "admin" && role != "contributor") redirect("/dashboard");

  const user = await getUser();
  if (!user) redirect ("/login")

  const groupCollection = await getCollection("groups");
  if (!groupCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
      name,
      currency,
      split,
      avatar,
      description,
    };

    groupCollection.findOneAndUpdate(
      {_id: new ObjectId(groupId)},
      { $set: data}
    );

  return {
    message: "Successfully Updated Group Information",
    status: StatusType.SUCCESS,
  };
}

export async function deleteGroup(
  membershipId: string | undefined,
  role: string | null
): Promise<{ message: string; status: StatusType } | undefined> {
  const user = await getUser();
  if (!user) redirect("/login");

  if (!membershipId) return { message: "Group Not Found", status: StatusType.ERROR };
  if (role != "admin")
    return {
      message: "Not Authorized for This Action",
      status: StatusType.WARNING,
    };

  const groupCollection = await getCollection("groups");
  if (!groupCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
    };
  await groupCollection?.findOneAndDelete({ _id: new ObjectId(membershipId) });
  
  return {
    message: "Successfully Deleted The Group",
    status: StatusType.SUCCESS,
  };
}