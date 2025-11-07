export enum StatusType {
  DEFAULT,
  SUCCESS,
  INFO,
  ERROR,
  WARNING,
}

export type RoleType = 'admin' | 'contributor' | 'editor' | 'viewer';
export type SplitType = "equal" | "exact" | "percentage";
export type InviteStatusType = "pending" | "accepted";

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

export type InviteState = {
  errors?: {
    email?: string[] | null;
    role?: string[] | null;
  };
  message: string;
  status: StatusType;
  role?: FormDataEntryValue | null;
} | null;

export interface SessionPayload {
  userId: string;
  userMail: string;
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
  groupId: string;
  name: string;
  groupAvatar?: string;
  description?: string;
  settings: {
    currency: string;
    defaultSplit: string;
  };
}

export interface MembershipType {
  groupId: string;
  name: string;
  role: string;
  joinedAt: string;
  groupAvatar?: string;
}

export interface InvitationType {
  inviteId: string;
  groupId: string;
  role: string;
  status: string;
  groupName: string;
  invitedBy: string;
  createdAt: string;
  expiresAt: string | number;
}