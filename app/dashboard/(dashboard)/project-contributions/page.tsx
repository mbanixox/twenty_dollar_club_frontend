import { requireMembership } from "@/lib/auth/session";

const Page = async () => {
  await requireMembership();

  return <div>Project Contributions Page</div>;
};

export default Page;
