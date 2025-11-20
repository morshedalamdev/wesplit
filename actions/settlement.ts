"use server";

import { getUser } from "@/lib/dal";
import { getCollection } from "@/lib/db";
import { SettlementState, StatusType } from "@/lib/types";
import { SettlementSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function addSettlement(state: SettlementState |undefined, formaData: FormData): Promise<SettlementState | undefined>{
  const validatedFields = SettlementSchema.safeParse({
    groupId: formaData.get("groupId"),
    expenseId: formaData.get("expenseId"),
    toUserId: formaData.get("toUserId"),
    amount: formaData.get("amount"),
    currency: formaData.get("currency"),
    method: formaData.get("method"),
    settledAt: formaData.get("settledAt"),
    notes: formaData.get("notes"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
      status: StatusType.INFO,
      expenseId: formaData.get("expenseId"),
      method: formaData.get("method"),
      settledAt: formaData.get("settledAt"),
      notes: formaData.get("notes"),
    };
  }

  const user = await getUser();
  if (!user) redirect("/login");

  const { groupId, expenseId, toUserId, amount, currency, method, settledAt, notes } = validatedFields.data;
  
    const settleCollection = await getCollection("settlements");
  if (!settleCollection) {
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
      expenseId: formaData.get("expenseId"),
      method: formaData.get("method"),
      settledAt: formaData.get("settledAt"),
      notes: formaData.get("notes"),
    };
  }

  const settlement = await settleCollection.insertOne({
    expenseId: new ObjectId(expenseId),
    groupId: new ObjectId(groupId),
    fromUserId: new ObjectId(user.userId),
    toUserId: new ObjectId(toUserId),
    amount,
    currency,
    method,
    settledAt,
    notes,
    createdAt: new Date(),
  });
  if (!settlement.acknowledged)
    return {
      message: "An Error Occurred While Adding Expense",
      status: StatusType.ERROR,
      expenseId: formaData.get("expenseId"),
      method: formaData.get("method"),
      settledAt: formaData.get("settledAt"),
      notes: formaData.get("notes"),
    };

  return {
    message: "Successfully Added Settlement",
    status: StatusType.SUCCESS,
  };
}

export async function deleteSettlement(
  settlementId: string | undefined,
  fromUserId: string | undefined,
  role: string | null
): Promise<{ message: string; status: StatusType } | undefined> {
  const user = await getUser();
  if (!user) redirect("/login");

  if (!settlementId)
    return { message: "Settlement Not Found", status: StatusType.ERROR };
  if (role != "admin" && role != "contributor" && fromUserId != user.userId)
    return {
      message: "Not Authorized for This Action",
      status: StatusType.WARNING,
    };

  const settlementCollection = await getCollection("settlements");
  if (!settlementCollection)
    return {
      message: "Server Error!",
      status: StatusType.ERROR,
    };
  await settlementCollection?.findOneAndDelete({
    _id: new ObjectId(settlementId),
  });

  return {
    message: "Successfully Deleted The Group",
    status: StatusType.SUCCESS,
  };
}