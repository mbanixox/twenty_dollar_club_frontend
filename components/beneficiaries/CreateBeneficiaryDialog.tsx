"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createBeneficiary } from "@/lib/beneficiaries/actions";

const CreateBeneficiaryDialog = () => {
  const [beneficiary_name, setBeneficiaryName] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const handleAddBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await createBeneficiary(beneficiary_name, relationship);
      if (result) {
        toast.success("Beneficiary created successfully");
        setOpen(false);
        setBeneficiaryName("");
        setRelationship("");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Add beneficiary failed");
      toast.error("Failed to create beneficiary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+</Button>
      </DialogTrigger>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Add Beneficiary</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleAddBeneficiary} className="mt-4 space-y-4">
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
            <Input
              id="relationship"
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 dark:bg-gray-400 hover:dark:bg-gray-500 hover:bg-gray-400"
          >
            {isLoading ? "Creating..." : "Create Beneficiary"}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center p-2">{error}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateBeneficiaryDialog;
