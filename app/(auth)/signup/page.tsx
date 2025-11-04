"use client";

import { useActionState, useEffect } from "react";
import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/lib/showToast";
import { redirect } from "next/navigation";
import { StatusType } from "@/lib/types";

export default function Signup() {
  const [state, action, isPending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.message) showToast(state.message, state?.status);
    if (state?.status === StatusType.SUCCESS) redirect("/dashboard");
  }, [state]);

  return (
    <form action={action}>
      <Card className="w-full max-w-sm mx-auto mt-10">
        <CardHeader className="text-center">
          <CardTitle>
            <Image
              src="/logo.png"
              alt="Logo"
              width={126}
              height={48}
              className="mx-auto mb-2"
            />
          </CardTitle>
          <CardDescription>
            Create an account and start managing your groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Mary"
                defaultValue={
                  typeof state?.name === "string" ? state.name : undefined
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
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={
                  typeof state?.email === "string" ? state.email : undefined
                }
                aria-invalid={state?.errors?.email ? true : false}
              />
              {state?.errors?.email && (
                <FieldError>{state.errors.email}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                aria-invalid={state?.errors?.password ? true : false}
              />
              {state?.errors?.password && (
                <FieldError>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                aria-invalid={state?.errors?.confirmPassword ? true : false}
              />
              {state?.errors?.confirmPassword && (
                <FieldError>{state.errors.confirmPassword}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <Spinner /> : ""} Sign up
          </Button>
          <CardAction>
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  );
}
