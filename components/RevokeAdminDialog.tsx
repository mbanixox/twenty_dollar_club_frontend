import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/lib/types";
import { capitalize } from "@/utils/string";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RevokeAdminDialogProps {
  updateOpen: boolean;
  setUpdateOpen: (open: boolean) => void;
  handleUpdate: () => void;
  user: User;
}

const revokeAdminDialog = ({
  updateOpen,
  setUpdateOpen,
  handleUpdate,
  user,
}: RevokeAdminDialogProps) => {
  return (
    <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircleIcon className="w-5 h-5" />
            Confirm Update
          </DialogTitle>
        </DialogHeader>
        <div>
          Are you sure you want to revoke admin rights for{" "}
          {capitalize(user.first_name)} {capitalize(user.last_name)}?
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setUpdateOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleUpdate}>
            Revoke Admin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default revokeAdminDialog;
