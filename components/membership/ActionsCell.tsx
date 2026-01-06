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
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActionsCell = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleViewDetails = (user: User) => {
    router.push(`/dashboard/members/${user.membership?.id}`);
  };

  return (
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
                user.membership?.generated_id.toString()
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
