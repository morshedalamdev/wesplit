"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/actions/auth";
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
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { showToast } from "@/lib/utils/showToast";
import { StatusType } from "@/lib/types";
import { redirect } from "next/navigation";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

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
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
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
                <FieldError>{state.errors.password}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? <Spinner /> : ""}Login
          </Button>
          <CardAction>
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  );
}
