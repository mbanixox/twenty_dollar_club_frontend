"use client";

import { Project } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/StatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatKSH } from "@/utils/format-currency";
import ActionsCell from "@/components/projects/ActionsCell";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";

export const columns = (isAdmin: boolean): ColumnDef<Project>[] => [
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
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => (
			<StatusBadge status={row.original.status} variant="project" />
		),
	},
	{
		accessorKey: "goal_amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Goal Amount" />
		),
		cell: ({ row }) => {
			const amount = row.original.goal_amount;
			return <span className="font-medium">{formatKSH(amount)}</span>;
		},
	},
	{
		accessorKey: "funded_amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Funded Amount" />
		),
		cell: ({ row }) => {
			const funded = row.original.funded_amount;
			const goal = row.original.goal_amount;
			const percentage = (funded / goal) * 100;

			const getColor = () => {
				if (percentage >= 100) return "text-green-600";
				if (percentage >= 75) return "text-blue-600";
				if (percentage >= 50) return "text-yellow-600";
				return "text-gray-600";
			};

			return (
				<div className="flex flex-col gap-1">
					<span className={`font-medium ${getColor()}`}>
						{formatKSH(funded)}
					</span>
					<span className="text-xs text-muted-foreground">
						{percentage.toFixed(1)}%
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Actions" />
		),
		cell: ({ row }) => {
			const project = row.original;
			return <ActionsCell project={project} isAdmin={isAdmin} />;
		},
	} as ColumnDef<Project>,
];
