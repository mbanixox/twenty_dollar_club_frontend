"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ReportSocket } from "@/lib/socket/report_socket";
import { downloadReport, generateReport } from "@/lib/report/actions";
import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";

interface ReportButtonProps {
  reportType: string;
  membership_id: string;
}

const ReportButton = ({ reportType, membership_id }: ReportButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [reportFilename, setReportFilename] = useState<string | null>(null);

  const socketRef = useRef<ReportSocket | null>(null);

  useEffect(() => {
    const socket = new ReportSocket();
    socket.connect();

    socket.joinReportChannel(membership_id, {
      onReportReady: (payload) => {
        if (payload.report_type === reportType) {
          setIsGenerating(false);
          setReportReady(true);
          setReportFilename(payload.filename);
          toast.success("Report generated successfully!", {
            description: "Your report is ready to download.",
          });
        }
      },
      onError: (payload) => {
        setIsGenerating(false);
        toast.error("Report generation failed", {
          description: payload.message,
        });
      },
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [membership_id, reportType]);

  const handleGenerateReport = async () => {
    let toastId: string | number | undefined;

    try {
      setIsGenerating(true);
      toastId = toast.loading("Preparing report...", {
        description: "This may take a few moments.",
      });

      const result = await generateReport(reportType);

      if (result.cached) {
        // Report already exists - switch directly to download mode
        setReportReady(true);
        setReportFilename(result.filename || null);
        setIsGenerating(false);

        toast.success("Report ready!", {
          id: toastId,
          description: "Your report is ready to download.",
        });
      } else {
        // New report is being generated - dismiss the loading toast
        toast.dismiss(toastId);

        // New report is being generated - wait for WebSocket notification
        if (!socketRef.current) {
          throw new Error("Socket not connected");
        }

        await socketRef.current.generateReport(reportType);
      }
    } catch (error) {
      setIsGenerating(false);

      if (error instanceof Error && error.message.includes("409")) {
        toast.warning("Report generation in progress", {
          id: toastId,
          description: "Please wait a moment and try again.",
        });
      } else {
        toast.error("Failed to generate report", {
          id: toastId,
          description: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  };

  const handleDownload = async (format: "excel" | "pdf") => {
    if (format === "pdf") {
      toast.info("PDF export coming soon", {
        description: "Feature in development.",
      });
      return;
    }

    if (!reportFilename) {
      toast.error("Report not available", {
        description: "Please generate the report first.",
      });
      return;
    }

    const toastId = toast.loading("Downloading report...");

    try {
      const result = await downloadReport(reportFilename);

      // Convert array back to Uint8Array and create blob
      const uint8Array = new Uint8Array(result.data);
      const blob = new Blob([uint8Array], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Report downloaded successfully!", { id: toastId });
    } catch (error) {
      toast.error("Download failed", {
        id: toastId,
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  if (isGenerating) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 lg:flex bg-blue-50 text-blue-600 border-blue-200"
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="hidden lg:inline ml-2">Generating...</span>
      </Button>
    );
  }

  if (reportReady) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 lg:flex bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          >
            <Download className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Download</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleDownload("excel")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel (.xlsx)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            PDF (Coming Soon)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto h-8 lg:flex bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
      onClick={handleGenerateReport}
    >
      <FileSpreadsheet className="h-4 w-4" />
      <span className="hidden lg:inline ml-2">Generate Report</span>
    </Button>
  );
};

export default ReportButton;
