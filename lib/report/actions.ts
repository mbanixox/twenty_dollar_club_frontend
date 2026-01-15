"use server";

import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.BACKEND_URL;

interface GenerateReportResponse {
  status: string;
  message: string;
  report_type?: string;
  filename?: string;
  download_url?: string;
  cached?: boolean;
  job_id?: string;
}

export const generateReport = async (
  reportType: string
): Promise<GenerateReportResponse> => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/reports/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ report_type: reportType }),
    });

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error("409: Report generation already in progress");
      }
      const errorText = await res.text();
      throw new Error(`Failed to generate report: ${res.status} ${errorText}`);
    }

    const data: GenerateReportResponse = await res.json();
    console.log("Report generation response:", data);
    return data;
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
};

export const downloadReport = async (filename: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/reports/download/${filename}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to download report: ${res.status} ${errorText}`);
    }

    // Return the blob data to the client
    const arrayBuffer = await res.arrayBuffer();
    return {
      data: Array.from(new Uint8Array(arrayBuffer)),
      filename: filename,
    };
  } catch (error) {
    console.error("Error downloading report:", error);
    throw error;
  }
};
