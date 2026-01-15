"use client";

import { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { columns } from "@/components/membership/columns";
import { DataTable } from "@/components/tables/data-table";

interface MembershipsTableProps {
  data: User[];
  membership_id?: string;
}

const MembershipsTable = ({ data, membership_id }: MembershipsTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      renderFilter={(table) => (
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("full_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
      reportType="memberships"
      membership_id={membership_id}
    />
  );
}

export default MembershipsTable;