import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import SignInDialog from "@/components/SignInDialog";
import AvatarWrapper from "@/components/AvatarWrapper";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="px-5 py-3 font-outfit sticky top-0 z-10 transition-all duration-300 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-2xl">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shrink-0">
              $20
            </div>
            <span className="font-semibold text-base">Twenty Dollar Club</span>
          </div>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="link" className="text-black" size="sm">
                  Dashboard
                </Button>
              </Link>
              <AvatarWrapper />
            </>
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
