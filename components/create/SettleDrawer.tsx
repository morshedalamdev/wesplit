"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datePicker";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useExpense } from "@/contexts/expenseContext";
import { useGroup } from "@/contexts/groupContext";
import { Spinner } from "../ui/spinner";
import { addSettlement } from "@/actions/settlement";
import { showToast } from "@/lib/utils/showToast";
import { StatusType } from "@/lib/types";

export default function SettleDrawer() {
  const { group } = useGroup();
  const { expenseSettleList, selectExpense, selectedExpense, refreshSelectedExpense } = useExpense();
  const [state, action, isPending] = useActionState(addSettlement, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshSelectedExpense();
  }, [state]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Settle Your Due</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settle Your Due</DrawerTitle>
        </DrawerHeader>
        <form action={action}>
          <FieldGroup className="px-4">
            <Field className="hidden">
              <input name="groupId" value={selectedExpense?.groupId} readOnly />
              <input
                name="toUserId"
                value={selectedExpense?.toUserId}
                readOnly
              />
              <input
                name="currency"
                value={group?.settings?.currency}
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="expenseId">Due</FieldLabel>
              {expenseSettleList && (
                <Select
                  name="expenseId"
                  onValueChange={(val) => selectExpense(val)}
                  defaultValue={
                    typeof state?.expenseId === "string" ? state.expenseId : ""
                  }
                  aria-invalid={state?.errors?.expenseId ? true : false}
                >
                  <SelectTrigger id="expenseId">
                    <SelectValue placeholder="Select an expense" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseSettleList.map((e) => (
                      <SelectItem key={e.expenseId} value={e.expenseId}>
                        {e.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {state?.errors?.expenseId && (
                <FieldError>{state.errors.expenseId}</FieldError>
              )}
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="amount">amount</FieldLabel>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0,00.00"
                  value={selectedExpense?.amount}
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="split">Method</FieldLabel>
                <Select
                  name="method"
                  defaultValue={
                    typeof state?.method === "string" ? state.method : ""
                  }
                  aria-invalid={state?.errors?.method ? true : false}
                >
                  <SelectTrigger id="split">
                    <SelectValue placeholder="WeChat Pay" />
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
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="to">to</FieldLabel>
                <Input
                  id="to"
                  type="text"
                  value={selectedExpense?.toUser}
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="settledAt">date</FieldLabel>
                <DatePicker
                  name="settledAt"
                  id="settledAt"
                  defaultValue={
                    typeof state?.settledAt === "string" ? state.settledAt : ""
                  }
                  isInvalid={state?.errors?.settledAt ? true : false}
                />
                {state?.errors?.settledAt && (
                  <FieldError>{state.errors.settledAt}</FieldError>
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="notes">notes</FieldLabel>
              <Textarea
                id="notes"
                name="notes"
                placeholder="any additional notes..."
                className="resize-none"
                defaultValue={
                  typeof state?.notes === "string" ? state.notes : ""
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
                {isPending ? <Spinner /> : ""}Settle
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
