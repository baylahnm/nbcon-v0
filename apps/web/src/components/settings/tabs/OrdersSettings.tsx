"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@nbcon/config";
import { ExternalLink, FileText, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  service: string;
  status: "active" | "completed" | "cancelled";
  total: number;
  date: string;
}

export function OrdersSettings() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [filter, setFilter] = React.useState<"all" | "active" | "completed" | "cancelled">("all");
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // In a real implementation, this would fetch from an orders table
      // For now, we'll use mock data
      const mockOrders: Order[] = [
        {
          id: "ord_001",
          service: "AI Analysis",
          status: "completed",
          total: 99.99,
          date: "2024-01-15",
        },
        {
          id: "ord_002",
          service: "Data Processing",
          status: "active",
          total: 149.99,
          date: "2024-01-20",
        },
        {
          id: "ord_003",
          service: "Custom Integration",
          status: "cancelled",
          total: 299.99,
          date: "2024-01-10",
        },
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error("Error in loadOrders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusBadge = (status: Order["status"]) => {
    const variants = {
      active: "bg-blue-500/10 text-blue-500",
      completed: "bg-green-500/10 text-green-500",
      cancelled: "bg-red-500/10 text-red-500",
    };
    return (
      <Badge className={cn("capitalize", variants[status])}>{status}</Badge>
    );
  };

  if (isLoading) {
    return (
      <section className="relative mb-4">
        <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
          <h3 className="w-full text-lg font-normal">
            <div className="truncate select-none">Orders</div>
          </h3>
        </div>
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      </section>
    );
  }

  return (
    <section className="relative mb-4">
      {/* Header */}
      <div className="min-h-[60px] flex items-center py-3 border-border dark:border-[#2d2d2d] border-b">
        <h3 className="w-full text-lg font-normal">
          <div className="truncate select-none">Orders</div>
        </h3>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 my-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="flex gap-2">
          {(["all", "active", "completed", "cancelled"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-border dark:border-[#2d2d2d] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">ID</th>
              <th className="text-left p-3 text-sm font-medium">Service</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
              <th className="text-left p-3 text-sm font-medium">Total</th>
              <th className="text-left p-3 text-sm font-medium">Date</th>
              <th className="text-right p-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-border dark:border-[#2d2d2d] hover:bg-muted/50"
                >
                  <td className="p-3 text-sm">{order.id}</td>
                  <td className="p-3 text-sm">{order.service}</td>
                  <td className="p-3">{getStatusBadge(order.status)}</td>
                  <td className="p-3 text-sm">${order.total.toFixed(2)}</td>
                  <td className="p-3 text-sm">{order.date}</td>
                  <td className="p-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedOrder.service}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-border dark:border-[#2d2d2d]">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Invoice
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Chat History
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

