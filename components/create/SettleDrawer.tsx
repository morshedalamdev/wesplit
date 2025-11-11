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

export default function SettleDrawer() {
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
            <Select defaultValue="1">
              <SelectTrigger id="due">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">October 13, 2025</SelectItem>
                <SelectItem value="2">November 5, 2025</SelectItem>
                <SelectItem value="3">December 12, 2025</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="amount">amount</FieldLabel>
              <Input id="amount" type="number" placeholder="0,00.00" />
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
              <Input id="to" type="text" />
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
