import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    email: z.email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password and confirm password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Password is required." }).trim(),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  description: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z
      .string()
      .min(10, { message: "Note must be at least 10 characters long." })
      .trim()
      .optional()
  ),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message:
        "Please enter a valid international phone number (E.164 format).",
    })
    .optional(),
  avatar: z
    .any()
    .refine(
      (file) => {
        if (!file || typeof file === "string") return true;
        return file.size <= 1_000_000;
      },
      { message: "Image size must be less than 1MB." }
    )
    .optional(),
});

export const GroupSchema = z.object({
  groupId: z.string().trim().optional(),
  role: z.string().trim().optional(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  description: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z
      .string()
      .min(10, { message: "Note must be at least 10 characters long." })
      .trim()
      .optional()
  ),
  avatar: z
    .any()
    .refine(
      (file) => {
        if (!file || typeof file === "string") return true;
        return file.size <= 1_000_000;
      },
      { message: "Image size must be less than 1MB." }
    )
    .optional(),
  currency: z.string().trim(),
  split: z.string().trim(),
});

export const InviteSchema = z.object({
  groupId: z.string().trim().optional(),
  userRole: z.string().trim().optional(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  role: z.string({ message: "Please select a role." }).trim(),
});

export const MemberUpdateSchema = z.object({
  membershipId: z.string().trim().optional(),
  userRole: z.string().trim().optional(),
  role: z.string({ message: "Please select a role." }).trim(),
});

export const ExpenseSchema = z.object({
  groupId: z.string().trim().optional(),
  expenseId: z.string().trim().optional(),
  payerId: z.string().trim().optional(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .trim(),
  amount: z.preprocess((val) => {
    return Number(val);
  }, z.number({ message: "Please enter the expense amount." })),
  quantity: z.string().trim().optional(),
  date: z.preprocess((val) => new Date(val as string), z.date()),
  split: z.string({ message: "Please select a split method." }).trim(),
  notes: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z
      .string()
      .min(10, { message: "Note must be at least 10 characters long." })
      .trim()
      .optional()
  ),
  receipt: z
    .any()
    .refine(
      (file) => {
        if (!file || typeof file === "string") return true;
        return file.size <= 1_000_000;
      },
      { message: "Image size must be less than 1MB." }
    )
    .optional(),
  participants: z.array(z.string()).optional(),
});

export const SettlementSchema = z.object({
  settlementId: z.string().trim().optional(),
  expenseId: z.string({message: "Please select an expense."}).trim(),
  groupId: z.string().trim(),
  toUserId: z.string().trim(),
  amount: z.preprocess((val) => {
    return Number(val);
  }, z.number()),
  currency: z.string().trim(),
  method: z.string({ message: "Please select a settlement method." }).trim(),
  settledAt: z.preprocess((val) => new Date(val as string), z.date()),
  notes: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z
      .string()
      .min(10, { message: "Note must be at least 10 characters long." })
      .trim()
      .optional()
  ),
});