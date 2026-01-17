import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { Contribution } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActionsCell = ({ contribution }: { contribution: Contribution }) => {
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
            if (contribution.id) {
              navigator.clipboard.writeText(contribution.id.toString());
              toast.success("Contribution ID copied to clipboard");
            } else {
              toast.error("No Contribution ID found");
            }
          }}
        >
          Copy Contribution ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View contribution details</DropdownMenuItem>
        {contribution.project_id && (
          <Link href={`/dashboard/projects/${contribution.project_id}`}>
            <DropdownMenuItem>View associated project details</DropdownMenuItem>
          </Link>
        )}
        {contribution.membership_id && (
          <Link href={`/dashboard/members/${contribution.membership_id}`}>
            <DropdownMenuItem>View associated member details</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
