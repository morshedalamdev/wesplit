export type SignupState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      email?: FormDataEntryValue | null;
    }
  | undefined;
