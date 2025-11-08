import { Button } from "@/components/ui/button";
import { UtensilsCrossed, LogOut, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CartSheet } from "./CartSheet";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/menu")}>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">Campus Canteen</span>
        </div>
        
        <div className="flex items-center gap-3">
          {user && (
            <>
              {isAdmin && (
                <Button variant="outline" onClick={() => navigate("/admin")}>
                  Admin Dashboard
                </Button>
              )}
              <Button variant="ghost" onClick={() => navigate("/orders")}>
                <ShoppingBag className="w-5 h-5 mr-2" />
                My Orders
              </Button>
              <CartSheet />
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
