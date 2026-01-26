import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { User } from "lucide-react";
import SignOut from "@/components/SignOut";
import { capitalize } from "@/utils/string";
import { getSession } from "@/lib/auth/session";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AvatarWrapper = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="ml-auto flex items-center gap-2 cursor-pointer p-1">
          <Avatar>
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {capitalize(user?.first_name || "User")}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className="mr-1 h-4 w-4" />
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem className="hover:bg-red-100 focus:bg-red-100">
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarWrapper;
