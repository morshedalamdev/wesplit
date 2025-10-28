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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";

export default function Login() {
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
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="********"
              aria-invalid
            />
            <FieldError>Choose another username.</FieldError>
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
          Login
        </Button>
        <CardAction>
          Don't have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}