import { getMemberships } from "@/lib/memberships/actions";
import MembershipsTable from "@/components/membership/MembershipTable";

export default async function Page() {
  const data = await getMemberships();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Members</h1>
      <p className="text-muted-foreground mb-6 px-6">List of members</p>
      <MembershipsTable data={data.data} />
    </div>
  );
}
