"use client";

import { columns } from "@/components/membership/columns";
import { DataTable } from "@/components/tables/data-table";
import { Input } from "@/components/ui/input";
import { Membership } from "@/lib/types";

interface MembershipsTableProps {
  data: Membership[];
}

const MembershipsTable = ({ data }: MembershipsTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      renderFilter={(table) => (
        <Input
          placeholder="Filter by role..."
          value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("role")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
    />
  );
}

export default MembershipsTable;