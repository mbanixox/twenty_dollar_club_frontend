import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const Page = async () => {
  try {
    await requireAuth();
  } catch {
    redirect("/");
  }
  return <div>Project Contributions Page</div>;
};

export default Page;
