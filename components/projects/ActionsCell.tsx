import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { toast } from "sonner";
import { Project } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/DeleteDialog";
import { deleteProject } from "@/lib/projects/actions";
import EditProjectDialog from "@/components/projects/EditProjectDialog";

interface ActionsCellProps {
  project: Project;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ project }) => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);

      toast.success("Project deleted successfully");
      setDeleteOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete project");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <span className="font-extrabold">Actions</span>
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(project.id);
              toast.success("Project ID copied to clipboard");
            }}
          >
            Copy project ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className={"text-red-600"}
          >
            Delete project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProjectDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        project={project}
      />
      <DeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        handleDelete={handleDelete}
        subject="project"
      />
    </>
  );
};

export default ActionsCell;
