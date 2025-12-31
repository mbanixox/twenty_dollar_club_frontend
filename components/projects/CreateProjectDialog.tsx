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
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/projects/actions";

const CreateProjectDialog = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const status = "active";
  const funded_amount = 0;
  const [goal_amount, setGoalAmount] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const handleCreateProject = async (e: React.FormEvent) => {
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
      const result = await createProject({
        title,
        description,
        status,
        funded_amount,
        goal_amount: parsedGoal,
      });
      if (result) {
        toast.success("Project created successfully");
        setOpen(false);
        setTitle("");
        setDescription("");
        setGoalAmount("");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create project failed");
      toast.error("Failed to create project");
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
          <DialogTitle className="text-center">Create Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreateProject} className="mt-4 space-y-4">
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
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center p-2">{error}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
