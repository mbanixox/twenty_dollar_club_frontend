import { signOut } from "@/lib/auth/actions";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
        redirect("/");
      }}
      className="ml-auto"
    >
      <Button
        variant="destructive"
        size="sm"
        aria-label="Sign Out"
        type="submit"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </form>
  );
};

export default SignOut;
