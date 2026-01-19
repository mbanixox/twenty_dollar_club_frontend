"use server";

import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.BACKEND_URL;

export const getContributions = async () => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/contributions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch contributions: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    throw error;
  }
};

export const getMemberContributions = async (memberId: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/contributions/member/${memberId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch member contributions: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching member contributions:", error);
    throw error;
  }
};

export const getProjectContributions = async (projectId: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/contributions/project/${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch project contributions: ${res.status} ${errorText}`,
      );
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching project contributions:", error);
    throw error;
  }
};
