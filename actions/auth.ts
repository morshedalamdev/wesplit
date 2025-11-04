"use server";

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { LoginSchema, SignupSchema } from "@/lib/validation";
import { createSession, deleteSession } from '@/lib/session';
import { LoginState, SignupState, StatusType } from '@/lib/types';

export async function signup(
  state: SignupState | undefined,
  formData: FormData
): Promise<SignupState | undefined> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      name: formData.get("name"),
      email: formData.get("email"),
    };
  }

  const { name, email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection)
    return { message: "server error!", status: StatusType.ERROR };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return {
      errors: { email: ["email already register to the database"] },
      message: "Email Already Register to the Database",
      status: StatusType.WARNING,
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  const results = await userCollection?.insertOne({
    name,
    email,
    password: hashedPassword,
  });
  if (!results.acknowledged)
    return {
      message: "An Error Occurred While Creating Account!",
      status: StatusType.ERROR,
    };

  await createSession(results.insertedId.toString());
  return { message: "Successfully Create Account", status: StatusType.SUCCESS };
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
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { message: "server error!", status: StatusType.ERROR };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: ["user dose not excited!"] }, message: "User Dose Not Excited", status: StatusType.WARNING };

  const matchedPassword = await bcrypt.compare(
    password,
    existingUser?.password
  );
  if (!matchedPassword)
    return {
      errors: { password: ["password is not correct!"] },
      message: "Password is Not Correct",
      status: StatusType.WARNING,
    };

  await createSession(existingUser._id.toString());
  return { message: "Login Successful", status: StatusType.SUCCESS };
}

export async function logout(): Promise<{
  message: string;
  status: StatusType;
}> {
  await deleteSession();
  return {
    message: "Logout Successful",
    status: StatusType.INFO,
  };
}