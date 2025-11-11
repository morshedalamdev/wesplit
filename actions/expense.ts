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

export async function updateExpense (state: ExpenseState | undefined, formData: FormData): Promise<ExpenseState | undefined>{
  const validatedFields = ExpenseSchema.safeParse({
    expenseId: formData.get("expenseId"),
    payerId: formData.get("payerId"),
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

  const { expenseId, payerId, title, amount, date, split, notes, receipt } =
    validatedFields.data;
  let data;

  if (receipt?.size > 0) {
    const convertImage = await imageToBase64(receipt);
    data = {
      updatedAt: new Date(),
      title,
      amount,
      date,
      split,
      notes,
      receipt: convertImage,
    };
  } else {
    data = {
      updatedAt: new Date(),
      title,
      amount,
      date,
      split,
      notes,
    };
  }

  const user = await getUser();
  if (!user) redirect ("/login")
  
  if (user.userId != payerId) redirect("/dashboard");

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
    };

    expenseCollection.findOneAndUpdate(
      {_id: new ObjectId(expenseId)},
      { $set: data}
    );

  return {
    message: "Successfully Updated Group Information",
    status: StatusType.SUCCESS,
  };
}

export async function deleteExpense(
  expenseId: string | undefined,
  payerId: string | undefined,
  role: string | null
): Promise<{ message: string; status: StatusType } | undefined> {
  const user = await getUser();
  if (!user) redirect("/login");

  if (!expenseId) return { message: "Expense Not Found", status: StatusType.ERROR };
  if (role != "admin" && role != "contributor" && payerId != user.userId)
    return {
      message: "Not Authorized for This Action",
      status: StatusType.WARNING,
    };

  const expenseCollection = await getCollection("expenses");
  if (!expenseCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
    };
  await expenseCollection?.findOneAndDelete({ _id: new ObjectId(expenseId) });
  
  return {
    message: "Successfully Deleted The Group",
    status: StatusType.SUCCESS,
  };
}