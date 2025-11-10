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
import { ReactNode, useActionState, useEffect } from "react";
import { showToast } from "@/lib/utils/showToast";
import { Spinner } from "../ui/spinner";
import { GroupMemberType, StatusType } from "@/lib/types";
import { update } from "@/actions/membership";

export default function EditMemberDrawer ({ children, data }: { children: ReactNode, data: GroupMemberType }) {
  const { userRole, refreshGroupMember } = useGroup();
  const [state, action, isPending] = useActionState(update, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshGroupMember();
  }, [state]);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Member</DrawerTitle>
        </DrawerHeader>
        <form action={action}>
          <FieldGroup className="px-4">
            <Field className="hidden">
              <Input
                name="membershipId"
                type="text"
                defaultValue={data.membershipId}
              />
              <Input
                name="userRole"
                type="text"
                defaultValue={userRole ? userRole : ""}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                name="name"
                id="name"
                type="text"
                defaultValue={data.name}
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="role">role</FieldLabel>
              <Select
                name="role"
                defaultValue={
                  typeof state?.role === "string" ? state.role : data?.role
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