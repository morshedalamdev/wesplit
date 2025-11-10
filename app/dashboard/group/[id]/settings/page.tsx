"use client";

import { deleteGroup, updateGroup } from "@/actions/group";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useGroup } from "@/contexts/groupContext";
import { StatusType } from "@/lib/types";
import { showToast } from "@/lib/utils/showToast";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Settings () {
  const { group, userRole, refreshGroup, refreshAllGroups } = useGroup();
  const [state, action, isPending] = useActionState(updateGroup, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) {
      refreshGroup();
      refreshAllGroups();
    }
  }, [state]);

  const handleDelete = async () => {
    const result = await deleteGroup(group?.groupId, userRole);
    if(result?.message) showToast(result.message, result?.status);
    if (result?.status == StatusType.SUCCESS){
      refreshAllGroups();
      redirect("/dashboard");
    }
  };

  return (
    <form action={action}>
      <FieldGroup>
        <FieldGroup className="px-4">
          <Field className="hidden">
            <Input name="id" type="text" defaultValue={group?.groupId} />
            <Input
              name="role"
              type="text"
              defaultValue={userRole ? userRole : ""}
            />
          </Field>
          <Field className="flex flex-row items-end gap-2">
            <div className="!w-16">
              <FieldLabel htmlFor="avatar">
                {group?.groupAvatar ? (
                  <Image
                    src={`data:image/jpeg;base64,${group.groupAvatar}`}
                    alt="User Avatar"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Skeleton className="h-16 w-16 rounded-full" />
                )}
              </FieldLabel>
            </div>
            <div className="basis-0 grow">
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept=".jpg,.jpeg"
                aria-invalid={state?.errors?.avatar ? true : false}
              />
              <FieldDescription>Maximum Image Size Should 1MB</FieldDescription>
              {state?.errors?.avatar && (
                <FieldError>{state.errors.avatar}</FieldError>
              )}
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="name">name</FieldLabel>
            <Input
              name="name"
              id="name"
              type="text"
              defaultValue={
                typeof state?.name === "string" ? state.name : group?.name
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
                  typeof state?.currency === "string"
                    ? state.currency
                    : group?.settings.currency
                }
                aria-invalid={state?.errors?.currency ? true : false}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cny">CNY</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="bdt">BDT</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.currency && (
                <FieldError>{state.errors.currency}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="split">Default Split Method</FieldLabel>
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
          <Field>
            <FieldLabel htmlFor="notes">notes</FieldLabel>
            <Textarea
              name="description"
              id="notes"
              placeholder="any additional notes..."
              className="resize-none"
              defaultValue={
                typeof state?.description === "string"
                  ? state.description
                  : group?.description
              }
              aria-invalid={state?.errors?.description ? true : false}
            />
            {state?.errors?.description && (
              <FieldError>{state.errors.description}</FieldError>
            )}
          </Field>
          <Field orientation="horizontal">
            <Button disabled={isPending} type="submit">
              {isPending ? <Spinner /> : ""}Update
            </Button>
            <Button className="bg-amber-500">Leave</Button>
            <Button type="button" onClick={handleDelete} className="bg-red-500">
              Delete
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}