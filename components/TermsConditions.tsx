"use client";

import { Card } from "@/components/ui/card";

interface TermsConditionsStepProps {
  acceptedTerms: boolean;
  onAcceptTerms: (checked: boolean) => void;
}

const TermsConditionsStep = ({
  acceptedTerms,
  onAcceptTerms,
}: TermsConditionsStepProps) => {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Terms & Conditions</h2>
        <p className="text-muted-foreground mt-1">Please review our terms carefully</p>
      </div>

      <Card className="p-6 h-64 overflow-y-auto">
        <h3 className="font-semibold text-foreground mb-3">Membership Agreement</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            By enrolling as a member, you agree to the following terms and
            conditions governing your use of our services.
          </p>

          <p>
            <strong>1. Account Responsibilities</strong>
            <br />
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </p>

          <p>
            <strong>2. Membership Benefits</strong>
            <br />
            Your membership grants you access to exclusive content, features,
            and services as outlined in your selected plan.
          </p>

          <p>
            <strong>3. Payment Terms</strong>
            <br />
            Membership fees are billed on a recurring basis. You may cancel at
            any time, but refunds are subject to our refund policy.
          </p>

          <p>
            <strong>4. Privacy Policy</strong>
            <br />
            We collect and process your personal data in accordance with our
            Privacy Policy. Your data is protected and will not be shared with
            third parties without consent.
          </p>

          <p>
            <strong>5. Termination</strong>
            <br />
            We reserve the right to terminate accounts that violate our terms
            of service or engage in prohibited activities.
          </p>
        </div>
      </Card>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => onAcceptTerms(e.target.checked)}
          className="w-5 h-5 mt-0.5 rounded border-input bg-background accent-primary"
        />
        <span className="text-sm text-foreground">
          I have read and agree to the Terms & Conditions and Privacy Policy
        </span>
      </label>
    </div>
  );
};

export default TermsConditionsStep;