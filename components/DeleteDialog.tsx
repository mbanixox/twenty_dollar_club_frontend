"use client";

import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface DeleteDialogProps {
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  handleDelete: () => void;
  subject: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  deleteOpen,
  setDeleteOpen,
  handleDelete,
  subject,
}) => {
  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircleIcon className="w-5 h-5" />
            Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <div>
          Are you sure you want to delete this {subject}? This action cannot be
          undone.
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
