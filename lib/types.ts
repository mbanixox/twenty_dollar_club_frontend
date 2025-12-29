export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
};

export type Session = {
  user: User;
  token: string;
};