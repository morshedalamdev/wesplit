"use client";

import { useGroup } from "@/contexts/groupContext";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datePicker";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
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
import { useActionState, useEffect, useState } from "react";
import { addExpense } from "@/actions/expense";
import { Spinner } from "../ui/spinner";
import { showToast } from "@/lib/utils/showToast";
import { useExpense } from "@/contexts/expenseContext";
import { StatusType } from "@/lib/types";
import { Checkbox } from "../ui/checkbox";
import { useUser } from "@/contexts/userContext";

export default function ExpenseDrawer () {
  const { group } = useGroup();
  const { userData } = useUser();
  const { refreshAllExpenses} = useExpense();
  const [state, action, isPending] = useActionState(addExpense, undefined);
  const [ participants, setParticipants ] = useState<string[]>([]);


  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshAllExpenses();
  }, [state]);

  useEffect(() => {
    if (group?.members) {
      const memberIds = group.members
        .filter((m) => m.userId !== userData?.userId)
        .map((m) => m.userId);
      setParticipants(memberIds);
    }
  }, [group]);

  const handleCheckbox = (userId: string, isChecked: boolean) => {
    setParticipants((prev) =>
      isChecked ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add New Expense</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Expense</DrawerTitle>
        </DrawerHeader>
        <form action={action}>
          <FieldGroup className="px-4">
            <Field className="hidden">
              <input name="groupId" type="text" defaultValue={group?.groupId} />
              <input
                name="participants"
                type="text"
                value={JSON.stringify(participants)}
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="title">title</FieldLabel>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Hotel Rent..."
                defaultValue={
                  typeof state?.title === "string" ? state.title : ""
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
                    typeof state?.amount === "string" ? state.amount : ""
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
                    typeof state?.date === "string" ? state.date : ""
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
              </Field>
              <Field>
                <FieldLabel htmlFor="split">Split Method</FieldLabel>
                <Select
                  name="split"
                  defaultValue={
                    typeof state?.split === "string" ? state.split : "equal"
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
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-40">
                <FieldLabel>participants</FieldLabel>
                {group &&
                  group?.members.map(
                    (m) =>
                      m.userId !== userData?.userId && (
                        <Field key={m.userId} orientation="horizontal">
                          <Checkbox
                            id={`owed${m.userId}`}
                            checked={participants.includes(m.userId)}
                            onCheckedChange={(checked) =>
                              handleCheckbox(m.userId, !!checked)
                            }
                          />
                          <FieldLabel
                            htmlFor={`owed${m.userId}`}
                            className="font-normal cursor-pointer line-clamp-1 break-all"
                          >
                            {m.name}
                          </FieldLabel>
                        </Field>
                      )
                  )}
              </div>
              <Field>
                <FieldLabel htmlFor="notes">notes</FieldLabel>
                <Textarea
                  name="notes"
                  id="notes"
                  placeholder="any additional notes..."
                  className="resize-none h-full"
                  defaultValue={
                    typeof state?.notes === "string" ? state.notes : ""
                  }
                  aria-invalid={state?.errors?.notes ? true : false}
                />
                {state?.errors?.notes && (
                  <FieldError>{state.errors.notes}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Spinner /> : ""}Add
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