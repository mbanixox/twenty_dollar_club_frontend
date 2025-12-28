import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/auth/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterForm = () => {
  return (
    <form action={registerUser}>
      <div className="space-y-1 mb-3">
        <Label htmlFor="first_name" className="text-base">
          First Name
        </Label>
        <Input name="first_name" type="text" required />
      </div>

      <div className="space-y-1 mb-3">
        <Label htmlFor="last_name" className="text-base">
          Last Name
        </Label>
        <Input name="last_name" type="text" required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-base">
          Email
        </Label>
        <Input
          name="email"
          type="email"
          placeholder="name@example.com"
          required
        />
      </div>

      <div className="space-y-1 mt-3">
        <Label htmlFor="password" className="text-base">
          Password
        </Label>
        <Input name="password" type="password" required />
      </div>

      <div className="space-y-1 mt-3">
        <Label htmlFor="phone" className="text-base">
          Phone Number
        </Label>
        <Input name="phone" type="text" placeholder="e.g. 07000000" required />
      </div>

      <div className="space-y-1 mt-3">
        <Label htmlFor="gender" className="text-base">
          Gender
        </Label>
        <Select name="gender" required>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full my-5 dark:bg-gray-400 hover:dark:bg-gray-500 hover:bg-gray-400"
      >
        Create account
      </Button>
    </form>
  );
};

export default RegisterForm;
