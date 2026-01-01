"use client";

import { useEffect, useRef } from "react";
import { PaymentSocket } from "@/lib/socket/websocket";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSession } from "@/lib/auth/actions";

interface UsePaymentSocketProps {
  userEmail: string;
  onSuccess?: () => void;
  enabled?: boolean;
}

export function usePaymentSocket({ 
  userEmail, 
  onSuccess,
  enabled = true 
}: UsePaymentSocketProps) {
  const socketRef = useRef<PaymentSocket | null>(null);
  const isInitializedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // Prevent duplicate initialization
    if (!userEmail || !enabled || isInitializedRef.current) {
      return;
    }

    console.log("Initializing WebSocket for:", userEmail);
    isInitializedRef.current = true;

    // Initialize socket
    socketRef.current = new PaymentSocket();
    socketRef.current.connect();

    // Wait a bit for connection to establish before joining channel
    const joinTimer = setTimeout(() => {
      if (socketRef.current) {
        // Join payment channel
        socketRef.current.joinPaymentChannel(
          userEmail,
          async (payload) => {

            try {
              const result = await updateSession(payload.token, payload.user);
              console.log("Update session result:", result);

              toast.success("Payment successful! Membership created.", {
                description: "Redirecting to dashboard...",
              });

              // Refresh router cache to get new session
              window.location.href = "/dashboard";

              // Small delay to ensure everything is updated
              await new Promise(resolve => setTimeout(resolve, 300));

              // Call success callback
              if (onSuccess) {
                onSuccess();
              }
              
              // Force full page navigation to dashboard
              router.push("/dashboard");
              
            } catch (error) {
              console.error("Failed to update session:", error);
              toast.error("Failed to update session", {
                description: "Please try logging in again.",
              });
            }
          },
          (payload) => {
            console.error("Payment error:", payload.message);
            toast.error(payload.message || "Payment failed");
          }
        );
      }
    }, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(joinTimer);
      console.log("Cleaning up WebSocket connection");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [userEmail, router, onSuccess, enabled]);

  // Return a method to manually disconnect if needed
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    isInitializedRef.current = false;
  };

  return { disconnect };
}