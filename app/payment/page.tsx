import MembershipPaymentForm from "@/components/MembershipPaymentForm";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function PaymentPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
        <div>
        </div>
      <MembershipPaymentForm user={session.user} />
    </div>
  );
}