"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { membershipPaymentRequest } from "@/lib/mpesa/actions";
import { User } from "@/lib/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const MembershipPaymentForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const [phone, setPhone] = useState(user.phone_number || "");

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await membershipPaymentRequest(formData);

      if (result.status == "success") {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card className="bg-white dark:bg-black-100 dark:text-white p-3 m-1 rounded-lg shadow-lg max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle>Lipa na M-Pesa</CardTitle>
        <CardDescription>
          Pay KES 1 to join the Twenty Dollar Club
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="space-y-1 mb-3">
            <Label htmlFor="phone" className="text-base">
              Phone Number
            </Label>
            <Input
              name="phone"
              type="tel"
              placeholder="254707001002"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="254[0-9]{9}"
              required
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Format: 254XXXXXXXXX
            </p>
          </div>

          <div className="space-y-1 mb-3">
            <Label htmlFor="amount" className="text-base">
              Amount (KES)
            </Label>
            <Input
              name="amount"
              type="text"
              value="1"
              readOnly
              className="bg-muted"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full my-5 dark:bg-gray-400 hover:dark:bg-gray-50 hover:bg-gray-400"
          >
            {isPending ? "Processing..." : "Pay KES 1"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default MembershipPaymentForm;