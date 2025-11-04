export enum StatusType {
  DEFAULT,
  SUCCESS,
  INFO,
  ERROR,
  WARNING,
}

export interface FormError {
  [key: string]: string[] | string | undefined;
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