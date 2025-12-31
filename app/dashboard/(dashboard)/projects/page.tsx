import ProjectsTable from "@/components/projects/ProjectsTable";
import { getProjects } from "@/lib/projects/actions";
import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function Page() {
  try {
    await requireAuth();
  } catch {
    redirect("/");
  }

  const data = await getProjects();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Projects</h1>
      <p className="text-muted-foreground mb-6 px-6">List of Projects</p>
      <ProjectsTable data={data.data} />
    </div>
  );
}
