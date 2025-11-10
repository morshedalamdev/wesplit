"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
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
import { useActionState, useEffect } from "react";
import { createGroup } from "@/actions/group";
import { Spinner } from "../ui/spinner";
import { showToast } from "@/lib/utils/showToast";
import { StatusType } from "@/lib/types";
import { useGroup } from "@/contexts/groupContext";

export default function GroupDrawer() {
  const { refreshAllGroups } = useGroup();
  const [state, action, isPending] = useActionState(createGroup, undefined);
  
  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshAllGroups();
  }, [state]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="rounded-full" size="icon">
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form action={action}>
          <DrawerHeader>
            <DrawerTitle>Create New Group</DrawerTitle>
          </DrawerHeader>
          <FieldGroup className="px-4">
            <Field>
              <FieldLabel htmlFor="name">name</FieldLabel>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="New Group"
                defaultValue={
                  typeof state?.name === "string" ? state.name : undefined
                }
                aria-invalid={state?.errors?.name ? true : false}
              />
              {state?.errors?.name && (
                <FieldError>{state.errors.name}</FieldError>
              )}
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="currency">Default Currency</FieldLabel>
                <Select
                  name="currency"
                  defaultValue={
                    typeof state?.currency === "string" ? state.currency : "cny"
                  }
                  aria-invalid={state?.errors?.currency ? true : false}
                >
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="cny">CNY</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="bdt">BDT</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.currency && (
                  <FieldError>{state.errors.currency}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="split">Default Split</FieldLabel>
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
          </FieldGroup>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Spinner /> : ""}Create
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
