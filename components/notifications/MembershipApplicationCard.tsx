"use client";

import {
  Clock,
  Mail,
  Phone,
  User as UserIcon,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/lib/types";
import { formatDate } from "@/utils/format-date";
import { capitalize } from "@/utils/string";
import { approveUser, rejectUser } from "@/lib/admin/actions";

interface MembershipApplicationCardProps {
  application: User;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const MembershipApplicationCard = ({
  application,
  onApprove,
  onReject,
}: MembershipApplicationCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);

  const handleAction = async (action: "approve" | "reject") => {
    setIsProcessing(true);
    setActionType(action);

    try {
      if (action === "approve") {
        await approveUser(application.id);
        onApprove(application.id);
      } else {
        await rejectUser(application.id);
        onReject(application.id);
      }
    } catch (error) {
      console.error("Approval action failed:", error);
    } finally {
      setIsProcessing(false);
      setActionType(null);
    }
  };

  return (
    <Card className="border-2 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {capitalize(application.first_name[0])}
                {capitalize(application.last_name[0])}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {capitalize(application.first_name)}{" "}
                {capitalize(application.last_name)}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                Applied {formatDate(application.inserted_at!)}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">
              {application.email}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {application.phone_number}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{application.gender}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">ID: #{application.id}</span>
          </div>
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button
            onClick={() => handleAction("approve")}
            disabled={isProcessing}
            className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
          >
            {isProcessing && actionType === "approve" ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </>
            )}
          </Button>
          <Button
            onClick={() => handleAction("reject")}
            disabled={isProcessing}
            variant="destructive"
            className="flex-1 gap-2"
          >
            {isProcessing && actionType === "reject" ? (
              <>Processing...</>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Reject
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipApplicationCard;
