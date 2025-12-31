import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";

const Page = async () => {
  try {
    await requireAuth();
    redirect("/dashboard/members");
  } catch {
    redirect("/");
  }

  return null;
};

export default Page;
