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
import { Beneficiary } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/DeleteDialog";
import { deleteBeneficiary } from "@/lib/beneficiaries/actions";
import EditBeneficiaryDialog from "@/components/beneficiaries/EditBeneficiaryDialog";

interface ActionsCellProps {
  beneficiary: Beneficiary;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ beneficiary }) => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteBeneficiary(beneficiary.id);

      toast.success("Beneficiary deleted successfully");
      setDeleteOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete beneficiary");
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
              navigator.clipboard.writeText(beneficiary.id);
              toast.success("Beneficiary ID copied to clipboard");
            }}
          >
            Copy beneficiary ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit beneficiary
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className={"text-red-600"}
          >
            Delete beneficiary
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditBeneficiaryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        beneficiaryID={beneficiary.id}
        beneficiary_name={beneficiary.beneficiary_name}
        relationship={beneficiary.relationship}
      />
      <DeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        handleDelete={handleDelete}
        subject="beneficiary"
      />
    </>
  );
};

export default ActionsCell;
