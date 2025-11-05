export enum StatusType {
  DEFAULT,
  SUCCESS,
  INFO,
  ERROR,
  WARNING,
}

export enum RoleType {
  admin,
  contributor,
  editor,
  viewer
}

export enum splitType {
  equal,
  exact,
  percentage,
}

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message: string;
  status: StatusType;
  name?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
} | null;

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message: string;
  status: StatusType;
  email?: FormDataEntryValue | null;
} | null;

export type GroupState = {
  errors?: {
    name?: string[] | null;
    currency?: string[] | null;
    split?: string[] | null;
    description?: string[] | null;
    avatar?: string[] | null;
  };
  message: string;
  status: StatusType;
  name?: FormDataEntryValue | null;
  currency?: FormDataEntryValue | null;
  split?: FormDataEntryValue | null;
} | null;

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}

export interface UserType {
  id: string,
  name: string;
  email: string;
  phone?: string;
  description?: string;
  avatar?: string;
}

export interface GroupType {
  _id: string;
  name: string;
  ownerId: string;
  groupAvatar?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  settings: {
    currency: string;
    defaultSplit: string;
  };
}