import RegisterForm from "@/components/registration/RegisterForm";
import { Card } from "@/components/ui/card";
import { hasMembership } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const Page = async () => {
  const userHasMembership = await hasMembership();

  if (userHasMembership) {
    redirect("/");
  }

  return (
    <div className="font-sans min-h-screen bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 bg-white">
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
};

export default Page;
