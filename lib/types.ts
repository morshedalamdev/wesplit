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
  message?: string;
  name?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
} | null;

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  email?: FormDataEntryValue | null;
} | null;

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}