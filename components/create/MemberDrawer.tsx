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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useGroup } from "@/contexts/groupContext";
import { useActionState, useEffect } from "react";
import { showToast } from "@/lib/utils/showToast";
import { Spinner } from "../ui/spinner";
import { invite } from "@/actions/invite";

export default function MemberDrawer () {
  const { group } = useGroup();
  const [state, action, isPending] = useActionState(invite, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    // if (state?.status == StatusType.SUCCESS) refreshMemberships();
  }, [state]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add New Member</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Member</DrawerTitle>
        </DrawerHeader>
        <form action={action}>
          <FieldGroup className="px-4">
            <Field className="hidden">
              <Input name="id" type="text" defaultValue={group?.groupId} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                aria-invalid={state?.errors?.email ? true : false}
              />
              {state?.errors?.email && (
                <FieldError>{state.errors.email}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="role">role</FieldLabel>
              <Select
                name="role"
                defaultValue={
                  typeof state?.role === "string" ? state.role : "viewer"
                }
                aria-invalid={state?.errors?.role ? true : false}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.role && (
                <FieldError>{state.errors.role}</FieldError>
              )}
            </Field>
          </FieldGroup>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Spinner /> : ""}Invite
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