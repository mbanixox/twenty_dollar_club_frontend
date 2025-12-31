import MembershipsTable from "@/components/membership/MembershipTable";
import { getUsersWithMemberships } from "@/lib/memberships/actions";
import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function Page() {
  try {
    await requireAuth();
  } catch {
    redirect("/");
  }
  const data = await getUsersWithMemberships();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Members</h1>
      <p className="text-muted-foreground mb-6 px-6">List of members</p>
      <MembershipsTable data={data.data} />
    </div>
  );
}
