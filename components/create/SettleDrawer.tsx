"use client";

import { useActionState } from "react";
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
import { Field, FieldGroup, FieldLabel } from "../ui/field";
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

export default function SettleDrawer() {
  const { expenseSettleList, selectExpense, selectedExpense } = useExpense();
  // const [state, action, isPending] = useActionState(createGroup);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Settle Your Due</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settle Your Due</DrawerTitle>
        </DrawerHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="due">Due</FieldLabel>
            {expenseSettleList && (
              <Select onValueChange={(val) => selectExpense(val)}>
                <SelectTrigger id="due">
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
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="amount">amount</FieldLabel>
              <Input id="amount" type="number" placeholder="0,00.00" value={selectedExpense?.amount} readOnly />
            </Field>
            <Field>
              <FieldLabel htmlFor="split">Method</FieldLabel>
              <Select>
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
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="to">to</FieldLabel>
              <Input id="to" type="text" value={selectedExpense?.toUser} readOnly />
            </Field>
            <Field>
              <FieldLabel htmlFor="date">date</FieldLabel>
              <DatePicker id="date" />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="notes">notes</FieldLabel>
            <Textarea
              id="notes"
              placeholder="any additional notes..."
              className="resize-none"
            />
          </Field>
        </FieldGroup>
        <DrawerFooter>
          <DrawerClose asChild>
            {/* <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <Spinner /> : ""}Settle
            </Button> */}
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
