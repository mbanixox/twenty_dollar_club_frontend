import { getProjects } from "@/lib/projects/actions";
import { requireMembership, isAdmin } from "@/lib/auth/session";
import ProjectsTable from "@/components/projects/ProjectsTable";

export default async function Page() {
  const [data, userIsAdmin, session] = await Promise.all([
    getProjects(),
    isAdmin(),
    requireMembership(),
  ]);

  const membership = session.user.membership;
  const membership_id = membership ? membership.id : undefined;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Projects</h1>
      <p className="text-muted-foreground mb-6 px-6">List of projects</p>
      <ProjectsTable
        data={data.data}
        isAdmin={userIsAdmin}
        membership_id={membership_id}
      />
    </div>
  );
}
