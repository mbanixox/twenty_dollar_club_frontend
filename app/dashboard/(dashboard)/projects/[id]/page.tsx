import { requireMembership } from "@/lib/auth/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects/actions";
import PaymentDialog from "@/components/PaymentDialog";
import { formatKSH } from "@/utils/format-currency";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await requireMembership();
  const user = session.user;

  const { id } = await params;

  const projectData = await getProjectById(id);

  if (!projectData?.data) {
    notFound();
  }

  const project = projectData.data;
  const progress = (project.funded_amount / project.goal_amount) * 100;
  const remainingAmount = project.goal_amount - project.funded_amount;

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <Link href="/dashboard/projects">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </Link>

      <div className="space-y-6">
        {/* Project Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <Badge
              variant={
                project.status === "active"
                  ? "default"
                  : project.status === "completed"
                  ? "secondary"
                  : "outline"
              }
              className="text-sm px-3 py-1"
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </div>

        {/* Funding Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Funding Progress</CardTitle>
            <CardDescription>
              {progress.toFixed(1)}% of goal reached
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">
                  {formatKSH(project.funded_amount)}
                </p>
                <p className="text-sm text-muted-foreground">Raised</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatKSH(project.goal_amount)}
                </p>
                <p className="text-sm text-muted-foreground">Goal</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatKSH(remainingAmount)}
                </p>
                <p className="text-sm text-muted-foreground">Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        {project.status === "active" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Make a Contribution
              </CardTitle>
              <CardDescription>
                Support this project with a payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentDialog project={project} userEmail={user.email} />
            </CardContent>
          </Card>
        )}

        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <p className="text-base capitalize">{project.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Project ID
                </p>
                <p className="text-base font-mono">{project.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;