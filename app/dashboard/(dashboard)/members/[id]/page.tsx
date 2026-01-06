import {
  ArrowLeft,
  Award,
  Calendar,
  Mail,
  Phone,
  UserIcon,
  Users,
} from "lucide-react";
import {
  getMembershipById,
  getUsersWithMemberships,
} from "@/lib/memberships/actions";
import Link from "next/link";
import { User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireMembership } from "@/lib/auth/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  await requireMembership();

  const membershipId = (await params).id;
  const membershipData = await getMembershipById(membershipId);
  const membership = membershipData.data;

  const usersData = await getUsersWithMemberships();
  const users = usersData.data || [];

  const user = users.find(
    (u: User) => u.membership && u.membership.id === membershipId
  );

  const getInitials = () => {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <Link href="/dashboard/members">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Members
        </Button>
      </Link>

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
          {user.first_name} {user.last_name}
        </h1>
        <p className="text-muted-foreground">{user.email}</p>
        {membership && (
          <p className="text-sm text-muted-foreground mt-1">
            Member ID: #{membership.generated_id}
          </p>
        )}
      </div>

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
    </div>
  );
};

export default Page;
