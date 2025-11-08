import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface OrderWithProfile {
  id: string;
  total_amount: number;
  status: string;
  estimated_ready_time: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

export default function Admin() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/menu");
      return;
    }
    fetchOrders();
    subscribeToOrders();
  }, [isAdmin, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles(full_name)
      `)
      .in("status", ["pending", "preparing"])
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setOrders(data as OrderWithProfile[]);
    }
    setLoading(false);
  };

  const subscribeToOrders = () => {
    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update order status");
    } else {
      toast.success(`Order updated to ${newStatus}`);
      fetchOrders();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Canteen Dashboard</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No pending orders at the moment
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <Badge variant={order.status === "pending" ? "default" : "secondary"}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{order.profiles.full_name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold text-primary">
                        ₹{order.total_amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ordered at</span>
                      <span>{format(new Date(order.created_at), "p")}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Should be ready by</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                          {format(new Date(order.estimated_ready_time), "p")}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <Button
                        className="flex-1"
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                      >
                        Start Preparing
                      </Button>
                    )}
                    {order.status === "preparing" && (
                      <Button
                        className="flex-1"
                        variant="secondary"
                        onClick={() => updateOrderStatus(order.id, "ready")}
                      >
                        Mark as Ready
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
