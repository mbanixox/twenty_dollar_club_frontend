"use client";

import { useEffect, useRef } from "react";
import { PaymentSocket } from "@/lib/socket/websocket";
import { User } from "@/lib/types";

interface UsePaymentSocketProps {
  userEmail: string;
  enabled?: boolean;
  onMembershipCreated?: (payload: { token: string; user: User }) => void;
  onProjectPaid?: (payload: { contribution_id: string; project_id: string }) => void;
  onError?: (payload: { message: string }) => void;
}

export function usePaymentSocket({ 
  userEmail, 
  enabled = true,
  onMembershipCreated,
  onProjectPaid,
  onError
}: UsePaymentSocketProps) {
  const socketRef = useRef<PaymentSocket | null>(null);
  const isInitializedRef = useRef(false);

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
        socketRef.current.joinPaymentChannel(userEmail, {
          onMembershipCreated,
          onProjectPaid,
          onError,
        });
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
  }, [userEmail, enabled, onMembershipCreated, onProjectPaid, onError]);

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