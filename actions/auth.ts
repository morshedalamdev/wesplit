"use server";

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { LoginSchema, SignupSchema, UpdateUserSchema } from "@/lib/validation";
import { createSession, deleteSession } from '@/lib/session';
import { LoginState, SignupState, StatusType, UserType } from '@/lib/types';
import { getUserId } from "@/lib/dal";
import { ObjectId } from 'mongodb';
import { imageToBase64 } from '@/lib/utils/imageConvert';

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
    return { message: "Sever Error", status: StatusType.ERROR };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return {
      errors: { email: ["email already register to the database"] },
      message: "Email Already Register to the Database",
      status: StatusType.WARNING,
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userCollection?.insertOne({
    createdAt: new Date(),
    name,
    email,
    password: hashedPassword,
  });
  if (!result.acknowledged)
    return {
      message: "An Error Occurred While Creating Account!",
      status: StatusType.ERROR,
    };

  await createSession(result.insertedId.toString());
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
  if (!userCollection)
    return { message: "Sever Error", status: StatusType.ERROR };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser)
    return {
      errors: { email: ["user dose not excited!"] },
      message: "User Dose Not Excited",
      status: StatusType.WARNING,
    };

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

export async function updateUser(
  state: unknown,
  formData: FormData
): Promise<any> {
  const validatedFields = UpdateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    description: formData.get("description"),
    avatar: formData.get("avatar"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Enter Information Correctly",
      status: StatusType.INFO,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      description: formData.get("description"),
      avatar: formData.get("avatar"),
    };
  }

  const {name, email, phone, description, avatar} = validatedFields.data;
  const convertedAvatar = await imageToBase64(avatar);

  const userCollection = await getCollection("users");
  if (!userCollection)
    return { message: "Sever Error", status: StatusType.ERROR };

  const userId = await getUserId();
  if (!userId) return { message: "User Not Found in the Session", status: StatusType.ERROR };

  userCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        name,
        email,
        phone,
        description,
        avatar: convertedAvatar,
        updatedAt: new Date(),
      },
    }
  );

  return {
    message: "Successfully Updated User Information",
    status: StatusType.SUCCESS,
  };
}

export async function userData(): Promise<UserType | null> {
  const userCollection = await getCollection("users");
  if (!userCollection) return null;

  const userId = await getUserId();
  if (!userId) return null;

  const data = await userCollection.findOne({
    _id: new ObjectId(userId),
  });

  return {
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
    description: data?.description,
    avatar: data?.avatar,
  };
}