import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Mail,
    Phone,
    User as UserIcon,
    Users,
    Calendar,
    Award,
} from "lucide-react";
import { capitalize } from "@/utils/string";
import { Badge } from "@/components/ui/badge";
import { requireAuth } from "@/lib/auth/session";
import { Beneficiary, Project } from "@/lib/types";
import { getProjects } from "@/lib/projects/actions";
import { Separator } from "@/components/ui/separator";
import { getBeneficiaries } from "@/lib/beneficiaries/actions";
import EditProfileDialog from "@/components/profile/EditProfileDialog";

const Page = async () => {
  const session = await requireAuth();

  const beneficiariesData = await getBeneficiaries();
  const projectsData = await getProjects();

  const beneficiaries = beneficiariesData?.data || [];
  const projects = projectsData?.data || [];

  const user = session.user;
  const membership = user.membership;

  const getInitials = () => {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };

  const formatKSH = (amount: number) => {
    return `KSH ${amount.toLocaleString('en-KE')}`;
  }

  return (
    <div className="container mx-auto py-10 px-6 max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="h-32 w-32 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-lg">
            {getInitials()}
          </div>
          {membership && (
            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-md">
              <Badge
                variant={membership.role === "admin" ? "default" : "secondary"}
                className="px-3 py-1"
              >
                {membership.role === "admin" ? (
                  <Award className="h-3 w-3 mr-1" />
                ) : (
                  <Users className="h-3 w-3 mr-1" />
                )}
                {membership.role}
              </Badge>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold">
          {capitalize(user.first_name)} {capitalize(user.last_name)}
        </h1>
        <p className="text-muted-foreground">{user.email}</p>
        {membership && (
          <p className="text-sm text-muted-foreground mt-1">
            Member ID: #{membership.generated_id}
          </p>
        )}
        <div className="mt-4">
          <EditProfileDialog user={user} />
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Contact Information Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email Address</span>
              </div>
              <p className="text-base ml-6">{user.email}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Phone Number</span>
              </div>
              <p className="text-base ml-6">{user.phone_number}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <UserIcon className="h-4 w-4" />
                <span className="font-medium">Gender</span>
              </div>
              <p className="text-base ml-6 capitalize">{user.gender}</p>
            </div>
            {membership && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Membership Status</span>
                </div>
                <div className="ml-6">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Active Member
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
                <div
                  key={project.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
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
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <p className="text-lg font-semibold">
                        {Math.round(
                          (project.funded_amount / project.goal_amount) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>
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
}

export default Page;
