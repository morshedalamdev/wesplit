"use server";

import { LoginState, SignupState } from "@/lib/types";
import { LoginSchema, SignupSchema } from "@/lib/validation";

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
}