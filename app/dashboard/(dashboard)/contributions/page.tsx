import MembershipsTable from "@/components/contributions/MembershipTable";
import { requireMembership } from "@/lib/auth/session";
import { getContributions } from "@/lib/contributions/actions";

const Page = async () => {
  await requireMembership();
  
    const data = await getContributions();
  
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-2 px-6">Contributions</h1>
        <p className="text-muted-foreground mb-6 px-6">List of contributions</p>
        <MembershipsTable data={data.data} />
      </div>
    );
};

export default Page;
