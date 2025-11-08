import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Trash2, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

export function CartSheet() {
  const { items, totalAmount, totalItems, estimatedTime, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <SheetFooter className="flex-col gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Estimated time</span>
                </div>
                <span className="font-medium">{estimatedTime} min</span>
              </div>
              
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
              </div>
              
              <Button size="lg" className="w-full" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
