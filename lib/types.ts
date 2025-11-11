// FOR: TOASTER
export enum StatusType {
  DEFAULT,
  SUCCESS,
  INFO,
  ERROR,
  WARNING,
}
// FOR: STATIC VALUE
export type RoleType = "admin" | "contributor" | "editor" | "viewer";
export type SplitType = "equal" | "exact" | "percentage";
export type InviteStatusType = "pending" | "accepted";

// FOR: FORM ACTIONS
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

export type UserState = {
  errors?: {
    name?: string[] | null;
    email?: string[] | null;
    avatar?: string[] | null;
    phone?: string[] | null;
    description?: string[] | null;
  };
  message: string;
  status: StatusType;
  name?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  avatar?: FormDataEntryValue | null;
  phone?: FormDataEntryValue | null;
  description?: FormDataEntryValue | null;
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
  description?: FormDataEntryValue | null;
  avatar?: FormDataEntryValue | null;
} | null;

export type MemberState = {
  errors?: {
    email?: string[] | null;
    role?: string[] | null;
  };
  message: string;
  status: StatusType;
  role?: FormDataEntryValue | null;
} | null;

export type ExpenseState = {
  errors?: {
    title?: string[] | null;
    amount?: string[] | null;
    date?: string[] | null;
    split?: string[] | null;
    notes?: string[] | null;
    receipt?: string[] | null;
  };
  message: string;
  status: StatusType;
  title?: FormDataEntryValue | null;
  amount?: FormDataEntryValue | null;
  date?: FormDataEntryValue | null;
  split?: FormDataEntryValue | null;
  notes?: FormDataEntryValue | null;
  receipt?: FormDataEntryValue | null;
} | null;

// FOR: TYPE CHECK
export interface SessionPayload {
  userId: string;
  userMail: string;
  expiresAt: Date;
}

export interface UserType {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  avatar?: string;
}

export interface GroupType {
  groupId: string;
  name: string;
  groupAvatar?: string;
  description?: string;
  settings: {
    currency: string;
    defaultSplit: string;
  };
}

export interface AllGroupType {
  groupId: string;
  name: string;
  role: RoleType;
  joinedAt: string;
  groupAvatar?: string;
}

export interface InvitationType {
  invitedId: string;
  groupId: string;
  role: RoleType;
  status: InviteStatusType;
  groupName: string;
  invitedBy: string;
  createdAt: string;
  expiresAt: string | number;
}

export interface GroupMemberType {
  membershipId: string;
  memberId: string;
  name: string;
  role: RoleType;
  joinedAt: string;
}

export interface ExpenseType {
  expenseId: string;
  groupId: string;
  payer: string;
  payerId: string;
  title: string;
  amount: string;
  split: string;
  notes?: string;
  receipt?: string;
  date: string;
}