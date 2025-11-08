import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Clock, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-food.jpg";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="container flex h-16 items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">Campus Canteen</span>
        </div>
        <Button onClick={() => navigate(user ? "/menu" : "/auth")}>
          {user ? "Browse Menu" : "Get Started"}
        </Button>
      </nav>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="container relative py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Order Your Favorite
                  <span className="text-primary"> Campus Meals </span>
                  Online
                </h1>
                <p className="text-lg text-muted-foreground">
                  Skip the queue. Order breakfast, lunch, dinner, and snacks from your campus canteen.
                  Get your food ready when you arrive!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => navigate(user ? "/menu" : "/auth")}>
                    Order Now
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/menu")}>
                    View Menu
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Delicious food"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Save Time</h3>
              <p className="text-muted-foreground">
                Order ahead and skip the queue. Your food will be ready when you arrive.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Fresh & Delicious</h3>
              <p className="text-muted-foreground">
                Wide variety of veg and non-veg options prepared fresh daily.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Easy</h3>
              <p className="text-muted-foreground">
                Simple ordering process with secure payment options at checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-20 border-t">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Ready to Order?</h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of students enjoying hassle-free canteen ordering
            </p>
            <Button size="lg" onClick={() => navigate(user ? "/menu" : "/auth")}>
              Start Ordering Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Campus Canteen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
