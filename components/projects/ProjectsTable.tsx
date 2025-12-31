"use client";

import { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { columns } from "@/components/projects/columns";
import { DataTable } from "@/components/tables/data-table";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";

interface ProjectsTableProps {
  data: Project[];
}

const ProjectsTable = ({ data }: ProjectsTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      renderFilter={(table) => (
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("title")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("title")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
      renderAddButton={() => <CreateProjectDialog />}
    />
  );
};

export default ProjectsTable;
