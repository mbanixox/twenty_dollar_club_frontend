import ContributionsTable from "@/components/contributions/ContributionsTable";
import { requireMembership } from "@/lib/auth/session";
import { getContributions } from "@/lib/contributions/actions";
import { getUsersWithMemberships } from "@/lib/memberships/actions";
import { User } from "@/lib/types";

const Page = async () => {
  await requireMembership();

  const contributionData = await getContributions();
  const contributions = contributionData.data;

  const usersData = await getUsersWithMemberships();
  const users = usersData.data || [];

  const membershipIdToName: Record<string, string> = {};
  // Creating a mapping from membership ID to user's full name
  // To display the member's name in the contributions table
  users.forEach((user: User) => {
    if (user.membership) {
      membershipIdToName[
        user.membership.id
      ] = `${user.first_name} ${user.last_name}`;
    }
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Contributions</h1>
      <p className="text-muted-foreground mb-6 px-6">List of contributions</p>
      <ContributionsTable data={contributions} membershipIdToName={membershipIdToName} />
    </div>
  );
};

export default Page;
