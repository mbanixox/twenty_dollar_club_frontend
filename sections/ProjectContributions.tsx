import ContributionsTable from "@/components/contributions/ContributionsTable";
import { Contribution, Project } from "@/lib/types";
import { capitalize } from "@/utils/string";

interface ProjectContributionsProps {
  project: Project;
  contributions: Contribution[];
  membershipIdToName: Record<string, string>;
}

const ProjectContributions = ({ project, contributions, membershipIdToName }: ProjectContributionsProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2">
        {capitalize(project.title)}&apos;s Contributions
      </h2>
      <p className="text-muted-foreground mb-6">List of contributions</p>
      <ContributionsTable
        data={contributions}
        membershipIdToName={membershipIdToName}
      />
    </section>
  );
};

export default ProjectContributions;
