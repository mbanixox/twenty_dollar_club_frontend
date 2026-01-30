import { getSession } from "@/lib/auth/session";
import MemberProfile from "@/sections/MemberProfile";

const Page = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6 max-w-5xl">
      <MemberProfile user={user} editable={true} />
    </div>
  );
};

export default Page;
