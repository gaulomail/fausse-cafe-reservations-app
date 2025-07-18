import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Phone, Star, Users, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Check if customer already exists
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', email)
        .single();

      if (existingCustomer) {
        // Update existing customer to enable newsletter
        await supabase
          .from('customers')
          .update({ newsletter_signup: true })
          .eq('email', email);
      } else {
        // Create new customer with newsletter signup
        await supabase
          .from('customers')
          .insert({
            name: 'Newsletter Subscriber',
            email: email,
            newsletter_signup: true
          });
      }

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Calendar,
      title: "Easy Reservations",
      description: "Book your table online for any date in 2025 with instant confirmation"
    },
    {
      icon: Users,
      title: "Perfect for Groups",
      description: "Accommodate parties of 1-12 guests with our flexible seating arrangements"
    },
    {
      icon: Clock,
      title: "Convenient Hours",
      description: "Open Monday-Saturday 5PM-11PM, Sunday 5PM-9PM"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Exceptional dining experience! The atmosphere is perfect for special occasions."
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Outstanding service and incredible food. Made our anniversary unforgettable."
    },
    {
      name: "Emma Davis",
      rating: 5,
      comment: "The reservation system is so easy to use, and the staff always accommodates our requests."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-playfair font-bold text-primary">Café Fausse</h1>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-primary font-medium">
                Home
              </Link>
              <Link to="/menu" className="text-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link to="/reservations" className="text-foreground hover:text-primary transition-colors">
                Reservations
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Button asChild>
                <Link to="/reservations">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-fade-in">
            Welcome to Café Fausse
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
            Experience exceptional dining in an elegant atmosphere. Reserve your table today for an unforgettable culinary journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button asChild size="lg" className="text-lg px-8 shadow-gold hover:shadow-elegant transition-all duration-300">
              <Link to="/reservations">Make a Reservation</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Why Choose Café Fausse</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border bg-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="font-playfair">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <p>1234 Culinary Ave, Suite 100, Washington, DC 20002</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <p>(202) 555-4567</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p>Monday–Saturday: 5:00 PM – 11:00 PM</p>
                    <p>Sunday: 5:00 PM – 9:00 PM</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 shadow-gold">
                <Link to="/reservations">Reserve Your Table</Link>
              </Button>
            </div>
            <div className="bg-gradient-elegant rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-primary">Special Occasions</h3>
              <p className="text-muted-foreground mb-4">
                Perfect for anniversaries, business dinners, and celebrations. Our intimate setting 
                and exceptional service create memorable experiences for you and your guests.
              </p>
              <p className="text-sm text-muted-foreground">
                For special requests or large parties (12+ guests), please call us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-gold">
        <div className="container mx-auto text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-primary-foreground" />
          <h2 className="text-3xl font-playfair font-bold mb-4 text-primary-foreground">Stay Connected</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, special events, and culinary updates.
          </p>
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/20 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              variant="secondary"
              className="px-6"
            >
              {isLoading ? "..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">What Our Guests Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg font-playfair">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4">Ready for an Exceptional Dining Experience?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your table now and join us for an evening of culinary excellence.
          </p>
          <Button asChild size="lg" className="text-lg px-8 shadow-gold">
            <Link to="/reservations">Make Your Reservation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-playfair font-semibold mb-2 text-primary">Café Fausse</h3>
          <p className="text-muted-foreground mb-4">Exceptional dining experiences since 2010</p>
          <p className="text-sm text-muted-foreground">
            © 2025 Café Fausse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;