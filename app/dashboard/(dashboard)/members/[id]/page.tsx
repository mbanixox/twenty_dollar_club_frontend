import {
  getMembershipById,
  getUsersWithMemberships,
} from "@/lib/memberships/actions";
import { User } from "@/lib/types";
import BackButton from "@/components/BackButton";
import MemberProfile from "@/sections/MemberProfile";
import { requireMembership } from "@/lib/auth/session";
import MemberContributions from "@/sections/MemberContributions";
import { getMemberContributions } from "@/lib/contributions/actions";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  await requireMembership();

  const membershipId = (await params).id;
  const membershipData = await getMembershipById(membershipId);
  const membership = membershipData.data;

  const usersData = await getUsersWithMemberships();
  const users = usersData.data || [];

  const user = users.find(
    (u: User) => u.membership && u.membership.id === membershipId,
  );

  const contributionData = await getMemberContributions(membershipId);
  const contributions = contributionData.data;

  const membershipIdToName: Record<string, string> = {};
  // Creating a mapping from membership ID to user's full name
  // To display the member's name in the contributions table
  users.forEach((user: User) => {
    if (user.membership) {
      membershipIdToName[user.membership.id] =
        `${user.first_name} ${user.last_name}`;
    }
  });

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <BackButton />

      <MemberProfile user={user} membership={membership} />

      <MemberContributions
        user={user}
        contributions={contributions}
        membershipIdToName={membershipIdToName}
        membershipId={membershipId}
      />
    </div>
  );
};

export default Page;
