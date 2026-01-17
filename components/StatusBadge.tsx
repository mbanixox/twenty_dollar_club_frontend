import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string;
  variant?: "project" | "contribution" | "payment";
};

const StatusBadge = ({ status, variant = "project" }: StatusBadgeProps) => {
  const getStyles = () => {
    if (variant === "project") {
      switch (status.toLowerCase()) {
        case "active":
          return "bg-green-100 text-green-800 border-green-200";
        case "completed":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "paused":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }

    if (variant === "contribution") {
      switch (status.toLowerCase()) {
        case "completed":
          return "bg-green-100 text-green-800 border-green-200";
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "failed":
          return "bg-red-100 text-red-800 border-red-200";
        case "cancelled":
          return "bg-gray-100 text-gray-800 border-gray-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }

    if (variant === "payment") {
      switch (status) {
        case "mpesa":
          return "text-emerald-800 border-emerald-200";
        case "card":
          return "text-purple-800 border-purple-200";
        case "cash":
          return "text-orange-800 border-orange-200";
        default:
          return "text-gray-800 border-gray-200";
      }
    }

    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getStyles(),
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
