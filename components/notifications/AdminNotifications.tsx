"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, UserCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MembershipApplicationCard from "@/components/notifications/MembershipApplicationCard";
import { User } from "@/lib/types";

type ActionMessage = {
  type: "success" | "error";
  text: string;
};

const AdminNotifications = ({ pendingUsers }: { pendingUsers: User[] }) => {
  const [applications, setApplications] = useState(pendingUsers);
  const [actionMessage, setActionMessage] = useState<ActionMessage | null>(
    null,
  );
  const handleApprove = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setActionMessage({
      type: "success",
      text: "Application approved successfully!",
    });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleReject = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setActionMessage({ type: "error", text: "Application rejected." });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const pendingCount = applications.length;

  return (
    <div className="space-y-6">
      {actionMessage && (
        <Alert
          className={
            actionMessage.type === "success"
              ? "border-green-500 bg-green-50 dark:bg-green-900/10"
              : "border-red-500 bg-red-50 dark:bg-red-900/10"
          }
        >
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={
              actionMessage.type === "success"
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }
          >
            {actionMessage.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Membership Applications</h3>
          <p className="text-sm text-muted-foreground">
            {pendingCount} {pendingCount === 1 ? "application" : "applications"}{" "}
            awaiting review
          </p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="destructive" className="gap-1">
            {pendingCount} Pending
          </Badge>
        )}
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserCheck className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground text-center">
              No pending membership applications at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <MembershipApplicationCard
              key={application.id}
              application={application}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
