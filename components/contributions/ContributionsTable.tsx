"use client";

import { Contribution } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { columns } from "@/components/contributions/columns";
import { DataTable } from "@/components/tables/data-table";

interface ContributionsTableProps {
  data: Contribution[];
  membershipIdToName: Record<string, string>;
}

const ContributionsTable = ({ data, membershipIdToName }: ContributionsTableProps) => {

  return (
    <DataTable
      columns={columns(membershipIdToName)}
      data={data}
      renderFilter={(table) => (
        <Input
          placeholder="Filter by reference..."
          value={
            (table.getColumn("transaction_reference")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("transaction_reference")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
    />
  );
};

export default ContributionsTable;
