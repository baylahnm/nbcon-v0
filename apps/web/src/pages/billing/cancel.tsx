import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function BillingCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-4">
          Your payment was cancelled. No charges were made.
        </p>
        <button
          onClick={() => navigate("/billing")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Return to Billing
        </button>
      </div>
    </div>
  );
}

