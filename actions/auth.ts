"use server";

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { LoginState, SignupState } from "@/lib/types";
import { LoginSchema, SignupSchema } from "@/lib/validation";
import { createSession } from '@/lib/session';
import { redirect } from "next/navigation";

export async function signup(state: SignupState, formData: FormData) {
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
  if(!userCollection) return {errors: {email: "server error!"}}

  const existingUser = await userCollection.findOne({email})
  if (existingUser)
    return { errors: { email: "email is already have an account!" } };

  const hashedPassword = await bcrypt.hash(password, 10);



  const results = await userCollection?.insertOne({ name, email, hashedPassword });
  if(!results.acknowledged)
    return {
      errors: { email: "An error occurred while creating your account!" },
    };

    await createSession(results.insertedId.toString())
    redirect("/");
}

export async function login(state: LoginState, formData: FormData) {
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
  if(!userCollection) return {errors: {email: "server error!"}}

  const existingUser = await userCollection.findOne({email})
  if(!existingUser) return {errors: {email: "user dose next excited!"}}

  console.log("existingUser :>> ", existingUser);

}

export async function logout() {
  
}