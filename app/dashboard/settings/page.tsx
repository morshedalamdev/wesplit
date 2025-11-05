"use client";

import { updateUser, userData } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/lib/types";
import { showToast } from "@/lib/utils/showToast";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

export default function Settings () {
  const [state, action, isPending] = useActionState(updateUser, undefined);
  const [data, setData] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await userData();
      setData(user);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
  }, [state]);

  return (
    <form action={action}>
      <FieldGroup>
        <FieldGroup className="px-4">
          <Field className="flex flex-row items-end gap-2">
            <div className="!w-16">
              <FieldLabel htmlFor="avatar">
                {data?.avatar ? (
                  <Image
                    src={`data:image/jpeg;base64,${data?.avatar}`}
                    alt="User Avatar"
                    width={64}
                    height={64}
                    className="rounded-full mb-2"
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
                defaultValue={data?.name}
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
                defaultValue={data?.email}
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
                defaultValue={data?.phone}
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
              defaultValue={data?.description}
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