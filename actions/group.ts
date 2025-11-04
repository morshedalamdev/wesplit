"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { GroupState, StatusType } from "@/lib/types";
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
  const userId = await getUser();
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

  const results = await groupCollection.insertOne({
    createdAt: new Date(),
    name,
    ownerId: new ObjectId(userId),
    settings: {
      currency,
      defaultSplit: split,
    },
  });

  if (!results.acknowledged)
    return {
      message: "An Error Occurred While Creating Group",
      status: StatusType.ERROR,
      name,
      currency,
      split,
    };

    return { message: "Successfully Create Group", status: StatusType.SUCCESS };
}