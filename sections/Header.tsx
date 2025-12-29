import SignInDialog from "@/components/SignInDialog";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="px-5 py-3 font-outfit sticky top-0 z-10 transition-all duration-300 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-2xl">
      <div className="flex justify-between items-center">
        <div>TwentyDollarClub</div>
        <div className="flex items-center gap-5 text-black">
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button size="sm">Sign Out</Button>
            </form>
          ) : (
            <>
              <SignInDialog />
              <Link href="/register">
                <Button size="sm">Become a member</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
