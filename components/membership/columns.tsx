"use client";

import { User } from "@/lib/types";
import { capitalize } from "@/utils/string";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, User as UserIcon } from "lucide-react";
import ActionsCell from "@/components/membership/ActionsCell";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";

export const columns: ColumnDef<User>[] = [
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
        id={row.original.membership?.id}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "generated_id",
    header: () => <div>Generated ID</div>,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">
        {row.original.membership?.generated_id ?? "-"}
      </span>
    ),
    accessorFn: (row) => row.membership?.generated_id,
  },
  {
    id: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      const { first_name, last_name } = row.original;
      return `${capitalize(first_name)} ${capitalize(last_name)}`;
    },
    accessorFn: (row) =>
      `${capitalize(row.first_name)} ${capitalize(row.last_name)}`,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone_number",
    header: () => <div>Phone Number</div>,
  },
  {
    id: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.membership?.role;
      const isAdmin = role === "admin";

      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
            isAdmin
              ? "bg-purple-100 text-purple-800 border-purple-200"
              : "bg-slate-100 text-slate-800 border-slate-200"
          }`}
        >
          {isAdmin ? (
            <Crown className="h-3 w-3" />
          ) : (
            <UserIcon className="h-3 w-3" />
          )}
          {capitalize(role || "")}
        </span>
      );
    },
    accessorFn: (row) => row.membership?.role,
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const user = row.original;

      return <ActionsCell user={user} />;
    },
  },
];
