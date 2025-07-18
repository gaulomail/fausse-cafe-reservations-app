import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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
            <h1 className="text-2xl font-bold">Café Fausse</h1>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/reservations" className="text-foreground hover:text-primary transition-colors">
                Reservations
              </Link>
              <Button asChild>
                <Link to="/reservations">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome to Café Fausse
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience exceptional dining in an elegant atmosphere. Reserve your table today for an unforgettable culinary journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/reservations">Make a Reservation</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Café Fausse</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
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
              <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <p>123 Culinary Street, Gourmet District, City 12345</p>
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
              <Button asChild className="mt-6">
                <Link to="/reservations">Reserve Your Table</Link>
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Special Occasions</h3>
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

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
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
          <h2 className="text-3xl font-bold mb-4">Ready for an Exceptional Dining Experience?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your table now and join us for an evening of culinary excellence.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/reservations">Make Your Reservation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Café Fausse</h3>
          <p className="text-muted-foreground mb-4">Exceptional dining experiences since 2025</p>
          <p className="text-sm text-muted-foreground">
            © 2025 Café Fausse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;