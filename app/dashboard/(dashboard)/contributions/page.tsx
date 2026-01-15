import { User } from "@/lib/types";
import { requireMembership } from "@/lib/auth/session";
import { getContributions } from "@/lib/contributions/actions";
import { getUsersWithMemberships } from "@/lib/memberships/actions";
import ContributionsTable from "@/components/contributions/ContributionsTable";

const Page = async () => {
  const [session, contributionData, usersData] = await Promise.all([
    requireMembership(),
    getContributions(),
    getUsersWithMemberships(),
  ]);

  const membership = session.user.membership;
  const membership_id = membership ? membership.id : undefined;

  const contributions = contributionData.data;

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
      <ContributionsTable
        data={contributions}
        membershipIdToName={membershipIdToName}
        membership_id={membership_id}
      />
    </div>
  );
};

export default Page;
