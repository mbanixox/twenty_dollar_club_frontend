import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Membership, User } from "@/lib/types";
import { capitalize } from "@/utils/string";
import { Users, UserIcon, Mail, Phone, Calendar, Crown } from "lucide-react";

interface MemberProfileProps {
  user: User;
  membership: Membership;
}

const MemberProfile = ({ user, membership }: MemberProfileProps) => {
  const getInitials = () => {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };

  return (
    <section className="space-y-6 mb-16">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div
            className="h-32 w-32 rounded-full bg-linear-to-br from-primary 
            to-primary/60 flex items-center justify-center text-primary-foreground 
            text-4xl font-bold shadow-lg"
          >
            {getInitials()}
          </div>
          {membership && (
            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-md">
              <Badge
                variant={membership.role === "admin" ? "default" : "secondary"}
                className="px-3 py-1"
              >
                {membership.role === "admin" ? (
                  <Crown className="h-3 w-3 mr-1" />
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
      </div>

      <Card>
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
    </section>
  );
};

export default MemberProfile;
