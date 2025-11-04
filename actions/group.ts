"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { GroupState } from "@/lib/types";
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
      name: formData.get("name"),
      currency: formData.get("currency"),
      split: formData.get("split"),
    };
  }

  const { name, currency, split } = validatedFields.data;
  const userId = await getUser();
  if (!userId) return { message: "user not found in the Database", errors: {}, name, currency, split };

  const groupCollection = await getCollection("groups");
  if (!groupCollection)
    return { message: "server error!", errors: {}, name, currency, split };

    const existingGroup = await groupCollection.findOne({
      name,
      ownerId: new ObjectId(userId),
    }); 
    if (existingGroup)
      return {
        errors: { name: ["The group already exists!"] },
        name,
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
      message: "An error occurred while creating new group!",
      errors: {},
      name,
      currency,
      split,
    };
}