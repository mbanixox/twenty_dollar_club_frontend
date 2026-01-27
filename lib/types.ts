export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  inserted_at?: string;
  membership_status:
    | "active"
    | "inactive"
    | "pending"
    | "approved"
    | "rejected";
  membership?: Membership;
};

export type Session = {
  user: User;
  token: string;
};

export type Membership = {
  id: string;
  role: "member" | "admin" | "super_admin";
  generated_id: number;
  beneficiaries?: Beneficiary[];
  projects?: Project[];
  contributions?: Contribution[];
};

export type Beneficiary = {
  id: string;
  beneficiary_name: string;
  relationship:
    | "spouse"
    | "child"
    | "parent"
    | "sibling"
    | "friend"
    | "relative";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "paused";
  goal_amount: number;
  funded_amount: number;
  contributions?: Contribution[];
};

export type Contribution = {
  id: string;
  transaction_reference?: string;
  payment_method: "mpesa" | "card" | "cash";
  status: "pending" | "completed" | "failed" | "cancelled";
  amount: number;
  description: string;
  phone_number?: string;
  email?: string;
  contribution_type: "Membership" | "Project";
  membership_id?: string;
  project_id?: string;
};

export type Notification = {
  id: string;
  event:
    | "new_project_created"
    | "project_updated"
    | "project_deleted"
    | "pending_project_contribution"
    | "contribution_received"
    | "beneficiary_added"
    | "pending_membership_approval";
  message: string;
  read: boolean;
  severity: "low" | "medium" | "high" | "critical";
  recipient_type: "user" | "admin" | "super_admin";
  resource_type: "project" | "membership" | "contribution" | "beneficiary";
  inserted_at: string;
};
