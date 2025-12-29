"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

interface CreateAccountStepProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
  };
  showPassword: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenderChange: (value: string) => void;
  onTogglePassword: () => void;
}

const CreateAccount = ({
  formData,
  showPassword,
  onInputChange,
  onGenderChange,
  onTogglePassword,
}: CreateAccountStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
        <p className="text-muted-foreground mt-1">Get started with your membership</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="first_name" className="text-sm font-medium">
            First Name
          </Label>
          <Input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={onInputChange}
            className="mt-1"
            placeholder="John"
          />
        </div>

        <div>
          <Label htmlFor="last_name" className="text-sm font-medium">
            Last Name
          </Label>
          <Input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={onInputChange}
            className="mt-1"
            placeholder="Doe"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="mt-1"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative mt-1">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onInputChange}
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {formData.password && formData.password.length < 8 && (
            <p className="text-sm text-destructive mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className="mt-1"
            placeholder="e.g. 07000000"
          />
        </div>

        <div>
          <Label htmlFor="gender" className="text-sm font-medium">
            Gender
          </Label>
          <Select
            name="gender"
            value={formData.gender}
            onValueChange={onGenderChange}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;