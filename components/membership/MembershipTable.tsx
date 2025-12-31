"use client";

import { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { columns } from "@/components/membership/columns";
import { DataTable } from "@/components/tables/data-table";

interface MembershipsTableProps {
  data: User[];
}

const MembershipsTable = ({ data }: MembershipsTableProps) => {
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
    />
  );
}

export default MembershipsTable;