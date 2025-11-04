"use server";

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { LoginSchema, SignupSchema } from "@/lib/validation";
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from "next/navigation";
import { LoginState, SignupState } from '@/lib/types';

export async function signup(state: SignupState | undefined, formData: FormData): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      name: formData.get("name"),
      email: formData.get("email"),
    };
  }

  const { name, email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { message: "server error!"};

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return {
      errors: { email: ["Email already has an account!"] },
      name: formData.get("name"),
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  const results = await userCollection?.insertOne({
    name,
    email,
    password: hashedPassword,
  });
  if (!results.acknowledged)
    return { message: "An error occurred while creating your account!" };

  await createSession(results.insertedId.toString());
  redirect("/");
}

export async function login(
  state: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { message: "server error!" };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: ["user dose next excited!"] } };

  const matchedPassword = await bcrypt.compare(
    password,
    existingUser?.password
  );
  if (!matchedPassword)
    return { errors: { password: ["Password is not correct!"] } };

  await createSession(existingUser._id.toString());
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}