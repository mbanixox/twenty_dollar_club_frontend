"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import MakeAdminDialog from "@/components/MakeAdminDialog";
import RevokeAdminDialog from "@/components/RevokeAdminDialog";
import { updateMembershipRole } from "@/lib/memberships/actions";

interface ActionsCellProps {
  user: User;
  isAdmin?: boolean;
}

const ActionsCell = ({ user, isAdmin }: ActionsCellProps) => {
  const [makeAdminOpen, setMakeAdminOpen] = useState(false);
  const [revokeAdminOpen, setRevokeAdminOpen] = useState(false);

  const router = useRouter();

  const handleViewDetails = (user: User) => {
    router.push(`/dashboard/members/${user.membership?.id}`);
  };

  const makeAdmin = async () => {
    try {
      await updateMembershipRole(user.membership?.id, "admin");

      toast.success("Member admin rights granted successfully");
      setMakeAdminOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to grant member admin rights");
    }
  };

  const revokeAdmin = async () => {
    try {
      await updateMembershipRole(user.membership?.id, "member");

      toast.success("Member admin rights revoked successfully");
      setRevokeAdminOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to revoke member admin rights");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <span className="font-extrabold">Actions</span>
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              if (user.membership?.generated_id) {
                navigator.clipboard.writeText(
                  user.membership?.generated_id.toString(),
                );
                toast.success("Generated ID copied to clipboard");
              } else {
                toast.error("No Generated ID found");
              }
            }}
          >
            Copy Generated ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleViewDetails(user)}>
            View member details
          </DropdownMenuItem>
          {isAdmin && user.membership?.role === "member" && (
            <DropdownMenuItem
              onClick={() => setMakeAdminOpen(true)}
              className="bg-purple-100"
            >
              <span className="text-purple-800">Make admin</span>
            </DropdownMenuItem>
          )}
          {isAdmin && user.membership?.role === "admin" && (
            <DropdownMenuItem
              onClick={() => setRevokeAdminOpen(true)}
              className="bg-red-100"
            >
              <span className="text-red-600">Revoke admin</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <MakeAdminDialog
        updateOpen={makeAdminOpen}
        setUpdateOpen={setMakeAdminOpen}
        handleUpdate={makeAdmin}
        user={user}
      />
      <RevokeAdminDialog
        updateOpen={revokeAdminOpen}
        setUpdateOpen={setRevokeAdminOpen}
        handleUpdate={revokeAdmin}
        user={user}
      />
      
    </>
  );
};

export default ActionsCell;
