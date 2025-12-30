"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/auth/actions";
import { Check, ArrowRight, ArrowLeft, User, FileText, CreditCard } from "lucide-react";
import CreateAccount from "@/components/registration/CreateAccount";
import TermsConditions from "@/components/TermsConditions";
import MpesaPaymentStep from "@/components/registration/MpesaPayment";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Create Account", icon: User },
  { id: 2, name: "Terms & Conditions", icon: FileText },
  { id: 3, name: "Payment", icon: CreditCard },
];

const RegisterForm = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    mpesa_phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("first_name", formData.first_name);
      formDataObj.append("last_name", formData.last_name);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("gender", formData.gender);

      await registerUser(formDataObj);
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return (
        formData.first_name &&
        formData.last_name &&
        formData.email &&
        formData.password.length >= 8 &&
        formData.phone &&
        formData.gender
      );
    }
    if (currentStep === 2) {
      return acceptedTerms;
    }
    if (currentStep === 3) {
      return formData.mpesa_phone && formData.mpesa_phone.length >= 12;
    }
    return false;
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-border rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center relative">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isCompleted
                      ? "bg-primary text-primary-foreground shadow-md"
                      : isCurrent
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-muted-foreground border-2 border-border"
                  } ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <StepIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className={`text-xs font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                    Step {step.id}
                  </p>
                  <p className={`text-sm font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}>
                    {step.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {currentStep === 1 && (
        <CreateAccount
          formData={formData}
          showPassword={showPassword}
          onInputChange={handleInputChange}
          onGenderChange={handleGenderChange}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      )}

      {currentStep === 2 && (
        <TermsConditions
          acceptedTerms={acceptedTerms}
          onAcceptTerms={setAcceptedTerms}
        />
      )}

      {currentStep === 3 && (
        <MpesaPaymentStep
          phoneNumber={formData.mpesa_phone}
          onPhoneChange={handleInputChange}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>

        {currentStep < 3 ? (
          <Button type="button" onClick={handleNext} disabled={!canProceed()} className="gap-2">
            Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? "Processing Payment..." : "Complete Registration"}
            <Check className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;