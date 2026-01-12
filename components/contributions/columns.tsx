"use client";

import { Contribution } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";
import { toast } from "sonner";
import Link from "next/link";

export const columns = (
  membershipIdToName: Record<string, string>
): ColumnDef<Contribution>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        id={row.original.id}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transaction_reference",
    header: () => <div>Reference</div>,
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
  },
  {
    accessorKey: "membership_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const membershipId = row.original.membership_id;
      const email = row.original.email;
      return (
        <span>
          {membershipId
            ? membershipIdToName[membershipId] || membershipId
            : email}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "contribution_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contribution Type" />
    ),
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const contribution = row.original;

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
              <Link href={`/dashboard/memberships/${contribution.membership_id}`}>
                <DropdownMenuItem>View associated member details</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
