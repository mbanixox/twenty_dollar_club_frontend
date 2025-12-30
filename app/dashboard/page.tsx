import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashboard/members");

  return null;
};

export default Page;
