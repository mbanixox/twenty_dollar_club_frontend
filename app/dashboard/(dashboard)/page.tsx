import { capitalize } from "@/utils/string";
import { Beneficiary, Project } from "@/lib/types";
import { getProjects } from "@/lib/projects/actions";
import { requireMembership } from "@/lib/auth/session";
import { getMemberships } from "@/lib/memberships/actions";
import { getBeneficiaries } from "@/lib/beneficiaries/actions";
import { Users, Folder, Heart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
  const session = await requireMembership();
  const user = session.user;

  const membershipData = await getMemberships();
  const projectsData = await getProjects();
  const beneficiariesData = await getBeneficiaries();

  const memberships = membershipData?.data || [];
  const projects = projectsData?.data || [];
  const beneficiaries = beneficiariesData?.data || [];
  const membersCount = memberships.length;

  const contributionsTotal = projects.reduce(
    (sum: number, p: Project) => sum + Number(p.funded_amount || 0),
    0
  );

  const formatKSH = (amount: number) => {
    return `KSh ${amount.toLocaleString("en-KE")}`;
  };

  return (
    <div className="container mx-auto py-10 px-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {capitalize(user.first_name)} {capitalize(user.last_name)}
      </h1>
      <p className="text-muted-foreground mb-8">
        Here’s an overview of your club’s activity and stats.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{membersCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{projects.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Beneficiaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{beneficiaries.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">
              {formatKSH(contributionsTotal)}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        {projects.length > 0 ? (
          <div className="grid gap-4">
            {projects.slice(0, 3).map((project: Project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex items-center gap-6 mt-2">
                    <span className="text-sm">
                      Status:{" "}
                      <span className="font-semibold">{project.status}</span>
                    </span>
                    <span className="text-sm">
                      Funded:{" "}
                      <span className="font-semibold">
                        {formatKSH(project.funded_amount)}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No projects available yet.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Beneficiaries</h2>
        {beneficiaries.length > 0 ? (
          <div className="grid gap-4">
            {beneficiaries.slice(0, 3).map((beneficiary: Beneficiary) => (
              <Card key={beneficiary.id}>
                <CardHeader>
                  <CardTitle>{beneficiary.beneficiary_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-muted-foreground capitalize">
                    {beneficiary.relationship}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No beneficiaries registered yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
