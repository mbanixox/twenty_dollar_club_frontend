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
};