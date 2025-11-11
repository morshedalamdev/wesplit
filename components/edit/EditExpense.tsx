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
import { ExpenseType, StatusType } from "@/lib/types";
import { updateExpense } from "@/actions/expense";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/datePicker";
import { useExpense } from "@/contexts/expenseContext";
import Image from "next/image";

export default function EditExpense ({ data }: { data: ExpenseType }) {
  const { refreshAllExpenses } = useExpense();
  const [state, action, isPending] = useActionState(updateExpense, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshAllExpenses();
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
              <Input
                name="expenseId"
                type="text"
                defaultValue={data.expenseId}
              />
              <Input name="payerId" type="text" defaultValue={data.payerId} />
            </Field>
            <Field>
              <FieldLabel htmlFor="title">title</FieldLabel>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Hotel Rent..."
                defaultValue={
                  typeof state?.title === "string" ? state.title : data.title
                }
                aria-invalid={state?.errors?.title ? true : false}
              />
              {state?.errors?.title && (
                <FieldError>{state.errors.title}</FieldError>
              )}
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="amount">amount</FieldLabel>
                <Input
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="0,00.00"
                  defaultValue={
                    typeof state?.amount === "string"
                      ? state.amount
                      : data.amount
                  }
                  aria-invalid={state?.errors?.amount ? true : false}
                />
                {state?.errors?.amount && (
                  <FieldError>{state.errors.amount}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="date">date</FieldLabel>
                <DatePicker
                  id="date"
                  name="date"
                  defaultValue={
                    typeof state?.date === "string" ? state.date : data.date
                  }
                  isInvalid={state?.errors?.date ? true : false}
                />
                {state?.errors?.date && (
                  <FieldError>{state.errors.date}</FieldError>
                )}
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="receipt">receipt</FieldLabel>
                <Input
                  id="receipt"
                  name="receipt"
                  type="file"
                  accept=".jpg,.jpeg"
                />
                {state?.errors?.receipt && (
                  <FieldError>{state.errors.receipt}</FieldError>
                )}
                {data?.receipt && (
                  <Image
                    src={`data:image/jpeg;base64,${data.receipt}`}
                    alt={data.title}
                    width={24}
                    height={80}
                    className="object-cover"
                  />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="split">Split Method</FieldLabel>
                <Select
                  name="split"
                  defaultValue={
                    typeof state?.split === "string" ? state.split : data.split
                  }
                  aria-invalid={state?.errors?.split ? true : false}
                >
                  <SelectTrigger id="split">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Equal</SelectItem>
                    <SelectItem value="exact">Exact</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.split && (
                  <FieldError>{state.errors.split}</FieldError>
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