"use client";

import { Contribution } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { columns } from "@/components/contributions/columns";
import { DataTable } from "@/components/tables/data-table";

interface ContributionsTableProps {
  data: Contribution[];
  membershipIdToName: Record<string, string>;
  membership_id?: string;
}

const ContributionsTable = ({
  data,
  membershipIdToName,
  membership_id,
}: ContributionsTableProps) => {
  return (
    <DataTable
      columns={columns(membershipIdToName)}
      data={data}
      renderFilter={(table) => (
        <Input
          placeholder="Filter by reference..."
          value={
            (table
              .getColumn("transaction_reference")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("transaction_reference")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
      reportType="contributions"
      membership_id={membership_id}
    />
  );
};

export default ContributionsTable;
