export type SignupErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type SignupState = { errors?: SignupErrors; message?: string } | undefined;

export type LoginErrors = {
  email?: string[];
  password?: string[];
};

export type LoginState = { errors?: LoginErrors; email?: string | null } | undefined;

  export interface SessionPayload {
    userId: string;
    expiresAt: Date;
  }