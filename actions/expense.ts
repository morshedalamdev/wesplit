"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { ExpenseState, StatusType } from "@/lib/types";
import { imageToBase64 } from "@/lib/utils/imageConvert";
import { ExpenseSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function addExpense(state: ExpenseState | undefined, formData: FormData): Promise<ExpenseState | undefined> {
  const validatedFields = ExpenseSchema.safeParse({
    groupId: formData.get("groupId"),
    title: formData.get("title"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    split: formData.get("split"),
    notes: formData.get("notes"),
    receipt: formData.get("receipt"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      title: formData.get("title"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      split: formData.get("split"),
      notes: formData.get("notes"),
      receipt: formData.get("receipt"),
    };
  }

  const user = await getUser();
  if (!user) redirect("/login");

  const { groupId, title, amount, date, split, notes, receipt } = validatedFields.data;
  let data;

  if (receipt?.size > 0) {
    const convertImage = await imageToBase64(receipt);
    data = {
      payerId: new ObjectId(user.userId),
      groupId: new ObjectId(groupId),
      createdAt: new Date(),
      title,
      amount,
      date,
      split,
      notes,
      receipt: convertImage,
    };
  } else {
    data = {
      payerId: new ObjectId(user.userId),
      groupId: new ObjectId(groupId),
      createdAt: new Date(),
      title,
      amount,
      date,
      split,
      notes,
    };
  }

  const expenseCollection = await getCollection("expenses");
  if (!expenseCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
      title: formData.get("title"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      split: formData.get("split"),
      notes: formData.get("notes"),
      receipt: formData.get("receipt"),
    }

  const expense = await expenseCollection.insertOne(data);

  if (!expense.acknowledged)
    return {
      message: "An Error Occurred While Adding Expense",
      status: StatusType.ERROR,
      title: formData.get("title"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      split: formData.get("split"),
      notes: formData.get("notes"),
      receipt: formData.get("receipt"),
    };

  return { message: "Successfully Added Expense", status: StatusType.SUCCESS };
}