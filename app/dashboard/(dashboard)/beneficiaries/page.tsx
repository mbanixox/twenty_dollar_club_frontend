import { requireMembership } from "@/lib/auth/session";
import { getBeneficiaries } from "@/lib/beneficiaries/actions";
import BeneficiariesTable from "@/components/beneficiaries/BeneficiariesTable";

export default async function Page() {
  await requireMembership();

  const data = await getBeneficiaries();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Beneficiaries</h1>
      <p className="text-muted-foreground mb-6 px-6">List of Beneficiaries</p>
      <BeneficiariesTable data={data.data} />
    </div>
  );
}
