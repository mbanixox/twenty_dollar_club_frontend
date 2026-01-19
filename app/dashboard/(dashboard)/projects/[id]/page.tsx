import Link from "next/link";
import { User } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { requireMembership } from "@/lib/auth/session";
import { getProjectById } from "@/lib/projects/actions";
import ProjectOverview from "@/sections/ProjectOverview";
import ProjectContributions from "@/sections/ProjectContributions";
import { getUsersWithMemberships } from "@/lib/memberships/actions";
import { getProjectContributions } from "@/lib/contributions/actions";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await requireMembership();
  const user = session.user;

  const { id } = await params;

  const projectData = await getProjectById(id);

  if (!projectData?.data) {
    notFound();
  }

  const project = projectData.data;

  const contributionData = await getProjectContributions(project.id);
  const contributions = contributionData.data;

  const usersData = await getUsersWithMemberships();
  const users = usersData.data || [];

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
      <Link href="/dashboard/projects">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </Link>

      <ProjectOverview project={project} user={user} />

      <ProjectContributions
        project={project}
        contributions={contributions}
        membershipIdToName={membershipIdToName}
      />
    </div>
  );
};

export default Page;
