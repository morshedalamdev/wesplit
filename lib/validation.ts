import {z} from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
  confirmPassword: z.string().trim(),
}).superRefine((val, ctx)=>{
  if(val.password !== val.confirmPassword){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password and confirm password do not match",
      path: ["confirmPassword"],
    });
  }
});

export const LoginSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { error: "Password is required." }).trim(),
});

export const GroupSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  description: z
    .string()
    .min(10, { error: "Note mush be at least 10 characters long." })
    .trim()
    .optional(),
  currency: z.string().trim(),
  split: z.string().trim(),
  avatar: z.string().trim().optional(),
});