import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth/actions";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
        redirect("/");
      }}
    >
      <button aria-label="Sign Out" type="submit" className="flex items-center">
        <LogOut className="mr-3 h-4 w-4 text-red-600" />
        <span className="text-red-600">Sign Out</span>
      </button>
    </form>
  );
};

export default SignOut;
