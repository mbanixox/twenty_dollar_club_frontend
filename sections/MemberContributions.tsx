import ContributionsTable from "@/components/contributions/ContributionsTable";
import { Contribution, User } from "@/lib/types";
import { capitalize } from "@/utils/string";

interface MemberContributionsProps {
  user: User;
  contributions: Contribution[];
  membershipIdToName: Record<string, string>;
  membershipId?: string;
}

const MemberContributions = ({
  user,
  contributions,
  membershipIdToName,
  membershipId,
}: MemberContributionsProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2">
        {capitalize(user.first_name)} {capitalize(user.last_name)}&apos;s
        Contributions
      </h2>
      <p className="text-muted-foreground mb-6">List of contributions</p>
      <ContributionsTable
        data={contributions}
        membershipIdToName={membershipIdToName}
        membership_id={membershipId}
      />
    </section>
  );
};

export default MemberContributions;
