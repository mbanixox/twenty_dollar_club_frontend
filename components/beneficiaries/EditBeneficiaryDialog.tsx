"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateBeneficiary } from "@/lib/beneficiaries/actions";

interface EditBeneficiaryDialogProps {
  beneficiaryID: string;
  beneficiary_name?: string;
  relationship?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EditBeneficiaryDialog = ({
  beneficiaryID,
  beneficiary_name: initialName,
  relationship: initialRelationship,
  open,
  onOpenChange,
}: EditBeneficiaryDialogProps) => {
  const [beneficiary_name, setBeneficiaryName] = React.useState(initialName);
  const [relationship, setRelationship] = React.useState(initialRelationship);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const router = useRouter();

  const handleEditBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await updateBeneficiary(
        beneficiaryID,
        beneficiary_name,
        relationship,
      );
      if (result) {
        toast.success("Beneficiary updated successfully");
        onOpenChange?.(false);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Edit beneficiary failed");
      toast.error("Failed to update beneficiary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Beneficiary</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleEditBeneficiary} className="mt-4 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="beneficiary_name" className="text-base">
              Beneficiary Name
            </Label>
            <Input
              id="beneficiary_name"
              type="text"
              value={beneficiary_name}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 mt-3">
            <Label htmlFor="relationship" className="text-base">
              Relationship
            </Label>
            <Select
              value={relationship}
              onValueChange={(value) => setRelationship(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="relative">Relative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 dark:bg-gray-400 hover:dark:bg-gray-500 hover:bg-gray-400"
          >
            {isLoading ? "Updating..." : "Update Beneficiary"}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center p-2">{error}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditBeneficiaryDialog;
