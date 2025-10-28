import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
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
            <Input id="name" type="text" placeholder="John Mary" />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 6 characters long.
            </FieldDescription>
            <Input id="password" type="password" placeholder="********" />
          </Field>
          {/* <Field>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Field> */}
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button type="submit" className="w-full">
          Sign up
        </Button>
        <CardAction>
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}