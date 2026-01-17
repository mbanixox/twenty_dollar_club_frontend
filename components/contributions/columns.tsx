"use client";

import { Contribution } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/StatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatKSH } from "@/utils/format-currency";
import ActionsCell from "@/components/contributions/ActionsCell";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";

export const columns = (
  membershipIdToName: Record<string, string>,
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
    cell: ({ row }) => (
      <span className="font-mono text-sm">
        {row.original.transaction_reference || "-"}
      </span>
    ),
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.original.payment_method} variant="payment" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} variant="contribution" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.original.amount;
      return <span className="font-semibold">{formatKSH(amount)}</span>;
    },
  },
  {
    accessorKey: "membership_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
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
    cell: ({ row }) => (
      <span className="capitalize text-sm">
        {row.original.contribution_type}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const contribution = row.original;

      return <ActionsCell contribution={contribution} />;
    },
  },
];
