"use client";

import { updateUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/userContext";
import { StatusType } from "@/lib/types";
import { showToast } from "@/lib/utils/showToast";
import Image from "next/image";
import { useActionState, useEffect } from "react";

export default function Settings () {
  const {userData, refreshUser} = useUser();
  const [state, action, isPending] = useActionState(updateUser, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status == StatusType.SUCCESS) refreshUser();
  }, [state]);
  console.log("userData :>> ", userData);

  return (
    <form action={action}>
      <FieldGroup>
        <FieldGroup className="px-4">
          <Field className="flex flex-row items-end gap-2">
            <div className="!w-16">
              <FieldLabel htmlFor="avatar">
                {userData?.avatar ? (
                  <Image
                    src={`data:image/jpeg;base64,${userData?.avatar}`}
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
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="name">name</FieldLabel>
              <Input
                name="name"
                id="name"
                type="text"
                defaultValue={
                  typeof state?.name === "string" ? state.name : userData?.name
                }
                aria-invalid={state?.errors?.name ? true : false}
              />
              {state?.errors?.name && (
                <FieldError>{state.errors.name}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={
                  typeof state?.email === "string"
                    ? state.email
                    : userData?.email
                }
                aria-invalid={state?.errors?.email ? true : false}
              />
              {state?.errors?.email && (
                <FieldError>{state.errors.email}</FieldError>
              )}
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="phone">phone</FieldLabel>
              <Input
                name="phone"
                id="phone"
                type="tel"
                placeholder="+86 123 1234 1234"
                defaultValue={
                  typeof state?.phone === "string"
                    ? state.phone
                    : userData?.phone
                }
                aria-invalid={state?.errors?.phone ? true : false}
              />
              {state?.errors?.phone && (
                <FieldError>{state.errors.phone}</FieldError>
              )}
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="description">description</FieldLabel>
            <Textarea
              name="description"
              id="description"
              placeholder="any additional notes..."
              className="resize-none"
              defaultValue={
                typeof state?.description === "string"
                  ? state.description
                  : userData?.description
              }
              aria-invalid={state?.errors?.description ? true : false}
            />
            {state?.errors?.description && (
              <FieldError>{state.errors.description}</FieldError>
            )}
          </Field>
          <Field orientation="horizontal">
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <Spinner /> : ""}Update
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}