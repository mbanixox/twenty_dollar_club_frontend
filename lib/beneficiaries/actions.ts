"use server";

import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.BACKEND_URL;

export const getBeneficiaries = async () => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/membership/beneficiaries`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch beneficiaries: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    throw error;
  }
};

export const createBeneficiary = async (
  beneficiary_name: string,
  relationship: string
) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/membership/beneficiaries/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        beneficiary: {
          beneficiary_name,
          relationship,
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to create beneficiary: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error creating beneficiary:", error);
    throw error;
  }
};

export const updateBeneficiary = async (
  beneficiaryID: string,
  beneficiary_name?: string,
  relationship?: string
) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${base_url}/membership/beneficiaries/${beneficiaryID}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          beneficiaryID,
          beneficiary: {
            beneficiary_name,
            relationship,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to update beneficiary: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error updating beneficiary:", error);
    throw error;
  }
};

export const deleteBeneficiary = async (beneficiaryID: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${base_url}/membership/beneficiaries/${beneficiaryID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          beneficiaryID,
        }),
      }
    );

    if (res.status === 204) {
      return true;
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to delete beneficiary: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error deleting beneficiary:", error);
    throw error;
  }
};
