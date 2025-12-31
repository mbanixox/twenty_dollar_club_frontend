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
  role: "member" | "admin";
  generated_id: number;
  beneficiaries?: Beneficiary[];
  projects?: Project[];
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
};
