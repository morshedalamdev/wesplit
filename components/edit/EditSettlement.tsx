"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useActionState, useEffect } from "react";
import { showToast } from "@/lib/utils/showToast";
import { Spinner } from "../ui/spinner";
import { SettlementType, StatusType } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/datePicker";
import { useExpense } from "@/contexts/expenseContext";
import { updateSettlement } from "@/actions/settlement";

export default function EditSettlement ({ data }: { data: SettlementType }) {
  const { refreshAllSettlements } = useExpense();
  const [state, action, isPending] = useActionState(updateSettlement, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshAllSettlements();
  }, [state]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-amber-500">Edit</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Expense</DrawerTitle>
        </DrawerHeader>
        <form action={action}>
          <FieldGroup className="px-4">
            <Field className="hidden">
              <input
                name="settlementId"
                type="text"
                value={data.settlementId}
                readOnly
              />
              <input
                name="fromUserId"
                type="text"
                value={data.fromUserId}
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" value={data.title} readOnly disabled />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="from">From</FieldLabel>
                <Input id="from" value={data.fromUser} readOnly disabled />
              </Field>
              <Field>
                <FieldLabel htmlFor="to">To</FieldLabel>
                <Input id="to" value={data.toUser} readOnly disabled />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input id="amount" value={data.amount} readOnly disabled />
              </Field>
              <Field>
                <FieldLabel htmlFor="currency">Currency</FieldLabel>
                <Input id="currency" value={data.currency} readOnly disabled />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="date">date</FieldLabel>
                <DatePicker
                  id="date"
                  name="settledAt"
                  defaultValue={
                    typeof state?.settledAt === "string"
                      ? state.settledAt
                      : data.settledAt
                  }
                  isInvalid={state?.errors?.settledAt ? true : false}
                />
                {state?.errors?.settledAt && (
                  <FieldError>{state.errors.settledAt}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="split">Method</FieldLabel>
                <Select
                  name="method"
                  defaultValue={
                    typeof state?.method === "string"
                      ? state.method
                      : data.method
                  }
                  aria-invalid={state?.errors?.method ? true : false}
                >
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wechat">WeChat Pay</SelectItem>
                    <SelectItem value="alipay">Alipay</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.method && (
                  <FieldError>{state.errors.method}</FieldError>
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="notes">notes</FieldLabel>
              <Textarea
                name="notes"
                id="notes"
                placeholder="any additional notes..."
                className="resize-none"
                defaultValue={
                  typeof state?.notes === "string" ? state.notes : data?.notes
                }
                aria-invalid={state?.errors?.notes ? true : false}
              />
              {state?.errors?.notes && (
                <FieldError>{state.errors.notes}</FieldError>
              )}
            </Field>
          </FieldGroup>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Spinner /> : ""}Update
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}