import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, CreditCard } from "lucide-react";

export default function Checkout() {
  const { items, totalAmount, estimatedTime, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return;
    
    setIsPlacing(true);
    
    try {
      const estimatedReadyTime = new Date();
      estimatedReadyTime.setMinutes(estimatedReadyTime.getMinutes() + estimatedTime);
      
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          estimated_ready_time: estimatedReadyTime.toISOString(),
          status: "pending"
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
        item_name: item.name
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex items-center justify-center py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => navigate("/menu")}>Browse Menu</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start pb-3 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Estimated preparation</span>
              </div>
              <span className="font-medium">{estimatedTime} minutes</span>
            </div>
            
            <div className="flex justify-between items-center pt-2 text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <CreditCard className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Pay at Counter</p>
                <p className="text-sm text-muted-foreground">Payment on collection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          size="lg" 
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={isPlacing}
        >
          {isPlacing ? "Placing Order..." : "Place Order"}
        </Button>
      </main>
    </div>
  );
}
