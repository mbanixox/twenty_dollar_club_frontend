"use client";

import { Beneficiary } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/beneficiaries/columns";
import CreateBeneficiaryDialog from "@/components/beneficiaries/CreateBeneficiaryDialog";

interface BeneficiariesTableProps {
  data: Beneficiary[];
}

const BeneficiariesTable = ({ data }: BeneficiariesTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      renderFilter={(table) => (
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("beneficiary_name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("beneficiary_name")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
      renderAddButton={() => <CreateBeneficiaryDialog />}
    />
  );
};

export default BeneficiariesTable;
