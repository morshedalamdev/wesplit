"use server";

import { getUserId } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { GroupState, GroupType, StatusType } from "@/lib/types";
import { GroupSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";

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
  const userId = await getUserId();
  if (!userId)
    return {
      message: "User Not Found in the Database",
      status: StatusType.ERROR,
      name,
      currency,
      split,
    };

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
      ownerId: new ObjectId(userId),
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
    ownerId: new ObjectId(userId),
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
    }

    const membershipCollection = await getCollection("memberships");
    if (!membershipCollection)
      return {
        message: "Membership Collection Error",
        status: StatusType.ERROR,
      };

      const membership = await membershipCollection.insertOne({
        joinedAt: new Date(),
        groupId: group.insertedId,
        userId: new ObjectId(userId),
        role: "admin",
      });

  if (!membership.acknowledged)
    return {
      message: "An Error Occurred While Creating Membership",
      status: StatusType.ERROR,
    };

    return { message: "Successfully Create Group", status: StatusType.SUCCESS };
}

export async function getGroups(): Promise<GroupType[] | null> {
  const userId = await getUserId();
  if (!userId) return null;

  const groupCollection = await getCollection("groups");
  if (!groupCollection) return null;

  const groups = await groupCollection
    .find({
      ownerId: new ObjectId(userId),
    })
    .sort({ createdAt: -1 })
    .toArray();

  const plainGroups = groups.map((group) => ({
    ...group,
    _id: group._id.toString(),
    ownerId: group.ownerId.toString(),
  }));

  return plainGroups;
}

export async function getGroup(groupId: string) {
  const userId = await getUserId();
  if (!userId) return null;

  const groupCollection = await getCollection("groups");
  if (!groupCollection) return null;

  const group = await groupCollection.findOne({
    _id: new ObjectId(groupId),
  });
  console.log("group :>> ", group);
  // const plainGroups = groups.map((group) => ({
  //   ...group,
  //   _id: group._id.toString(),
  //   ownerId: group.ownerId.toString(),
  // }));

  // return plainGroups;
}
