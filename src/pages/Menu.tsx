import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { MenuCard } from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { getImageForDish } from "@/lib/dishImages";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_veg: boolean;
  preparation_time: number;
  image_url?: string | null;
}

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [dietFilter, setDietFilter] = useState<string>("all");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("is_available", true)
      .order("category");
    
    if (!error && data) {
      const itemsWithImages = data.map(item => ({
        ...item,
        image_url: item.image_url || getImageForDish(item.name)
      }));
      setItems(itemsWithImages);
    }
    setLoading(false);
  };

  const filteredItems = items.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const dietMatch = dietFilter === "all" || 
      (dietFilter === "veg" && item.is_veg) ||
      (dietFilter === "non-veg" && !item.is_veg);
    return categoryMatch && dietMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">Choose from our delicious selection</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Tabs value={category} onValueChange={setCategory} className="flex-1">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
              <TabsTrigger value="snacks">Snacks</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button
              variant={dietFilter === "all" ? "default" : "outline"}
              onClick={() => setDietFilter("all")}
            >
              All
            </Button>
            <Button
              variant={dietFilter === "veg" ? "default" : "outline"}
              onClick={() => setDietFilter("veg")}
            >
              🥬 Veg
            </Button>
            <Button
              variant={dietFilter === "non-veg" ? "default" : "outline"}
              onClick={() => setDietFilter("non-veg")}
            >
              🍖 Non-Veg
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No items found for this selection
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
