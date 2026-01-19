"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { toast } from "sonner";
import { Project } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/lib/projects/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Crown } from "lucide-react";

interface EditProjectDialogProps {
  project: Project;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EditProjectDialog = ({
  project,
  open,
  onOpenChange,
}: EditProjectDialogProps) => {
  const [title, setTitle] = React.useState(project.title);
  const [description, setDescription] = React.useState(project.description);
  const [status, setStatus] = React.useState(project.status);
  const [goal_amount, setGoalAmount] = React.useState(
    project.goal_amount.toString(),
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const router = useRouter();

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const parsedGoal = parseFloat(goal_amount);
    if (isNaN(parsedGoal) || parsedGoal < 0) {
      setError("Please enter a valid, non-negative goal amount.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await updateProject(project.id, {
        title,
        description,
        status,
        goal_amount: parsedGoal,
      });
      if (result) {
        toast.success("Project updated successfully");
        onOpenChange?.(false);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Edit project failed");
      toast.error("Failed to update project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between gap-3">
              <span className="text-lg font-semibold">Edit project</span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full 
              border px-2.5 py-0.5 text-xs font-semibold mr-3
              bg-purple-100 text-purple-800 border-purple-200"
              >
                <Crown className="h-3 w-3" />
                admin
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleEditProject} className="mt-4 space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-base">
              Project Title
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1 mt-3">
            <Label htmlFor="relationship" className="text-base">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1 mt-3">
            <Label htmlFor="status" className="text-base">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as Project["status"])}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="goal_amount" className="text-base">
              Goal Amount
            </Label>
            <Input
              id="goal_amount"
              type="number"
              min="0"
              value={goal_amount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 dark:bg-gray-400 hover:dark:bg-gray-500 hover:bg-gray-400"
          >
            {isLoading ? "Updating..." : "Update Project"}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center p-2">{error}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
