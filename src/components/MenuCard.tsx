import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_veg: boolean;
  preparation_time: number;
}

export function MenuCard({ id, name, description, price, category, is_veg, preparation_time }: MenuCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id, name, price, is_veg, preparation_time });
    toast.success(`${name} added to cart`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-[var(--shadow-card)] hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{description}</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={is_veg ? "border-veg text-veg" : "border-non-veg text-non-veg"}
          >
            {is_veg ? "🥬 Veg" : "🍖 Non-Veg"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="capitalize">{category}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{preparation_time} min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <span className="text-2xl font-bold text-primary">₹{price.toFixed(2)}</span>
        <Button onClick={handleAddToCart} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
