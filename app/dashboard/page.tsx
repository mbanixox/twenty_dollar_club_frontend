import { redirect } from "next/navigation";
import { requireMembership } from "@/lib/auth/session";

const Page = async () => {
  await requireMembership();

  redirect("/dashboard/members");
};

export default Page;
