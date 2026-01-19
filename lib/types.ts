export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
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
  relationship: string;
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
  contribution_type: string;
  membership_id?: string;
  project_id?: string;
};
