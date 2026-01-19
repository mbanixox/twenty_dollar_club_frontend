import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/auth/session";
import { Beneficiary, Project } from "@/lib/types";
import { formatKSH } from "@/utils/format-currency";
import { getProjects } from "@/lib/projects/actions";
import MemberProfile from "@/sections/MemberProfile";
import { getBeneficiaries } from "@/lib/beneficiaries/actions";
import Link from "next/link";

const Page = async () => {
  const session = await requireAuth();

  const beneficiariesData = await getBeneficiaries();
  const projectsData = await getProjects();

  const beneficiaries = beneficiariesData?.data || [];
  const projects = projectsData?.data || [];

  const user = session.user;
  const membership = user.membership;

  return (
    <div className="container mx-auto py-10 px-6 max-w-5xl">
      <MemberProfile user={user} membership={membership} editable={true} />

      {/* Beneficiaries Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Beneficiaries
          </CardTitle>
          {beneficiaries.length > 0 && (
            <CardDescription>
              {beneficiaries.length} registered beneficiar
              {beneficiaries.length === 1 ? "y" : "ies"}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {beneficiaries.length > 0 ? (
            <div className="grid gap-3">
              {beneficiaries.map((beneficiary: Beneficiary, index: number) => (
                <div
                  key={beneficiary.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-base">
                        {beneficiary.beneficiary_name}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {beneficiary.relationship}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No beneficiaries registered yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Projects
          </CardTitle>
          {projects.length > 0 && (
            <CardDescription>
              {projects.length} project{projects.length === 1 ? "" : "s"}{" "}
              available
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="grid gap-4">
              {projects.map((project: Project) => (
                <div key={project.id}>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            project.status === "active"
                              ? "default"
                              : project.status === "completed"
                                ? "secondary"
                                : "outline"
                          }
                          className="ml-4"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Funded Amount
                          </p>
                          <p className="text-lg font-semibold">
                            {formatKSH(project.funded_amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Goal Amount
                          </p>
                          <p className="text-lg font-semibold">
                            {formatKSH(project.goal_amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Progress
                          </p>
                          <p className="text-lg font-semibold">
                            {Math.round(
                              (project.funded_amount / project.goal_amount) *
                                100,
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No projects available yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
