
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  StarIcon,
  CakeIcon,
  BeakerIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import heroImage from "@/assets/restaurant-hero.jpg";

const Index = () => {
  // Component for luxurious fine dining experience
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
        title: "Welcome to our family!",
        description: "You've been subscribed to our exclusive newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: StarIcon,
      title: "Award-Winning Excellence",
      description: "Winner of Culinary Excellence Award 2022 and Restaurant of the Year 2023",
      delay: 0.2
    },
    {
      icon: CakeIcon,
      title: "Master Culinary Team",
      description: "Led by renowned Chef Antonio Rossi with decades of Italian culinary expertise",
      delay: 0.4
    },
    {
      icon: BeakerIcon,
      title: "Locally Sourced",
      description: "Fresh, locally-sourced ingredients ensuring the highest quality in every dish",
      delay: 0.6
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Exceptional ambiance and unforgettable flavors. A true culinary masterpiece."
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "A must-visit restaurant for food enthusiasts. The service is impeccable."
    },
    {
      name: "Emma Davis",
      rating: 5,
      comment: "Every dish tells a story of passion and creativity. Simply extraordinary."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm shadow-elegant"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <CakeIcon className="h-8 w-8 text-primary" />
              <Link to="/" className="text-3xl font-playfair font-bold text-primary">
                Café Fausse
              </Link>
            </motion.div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-primary font-medium border-b-2 border-primary">
                Home
              </Link>
              <Link to="/menu" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 font-medium">
                Menu
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 font-medium">
                About
              </Link>
              <Link to="/gallery" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 font-medium">
                Gallery
              </Link>
              <Link to="/reservations" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 font-medium">
                Reservations
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="bg-primary hover:shadow-gold transition-all duration-300">
                  <Link to="/reservations">Book Now</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-burgundy-dark/80"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center text-cream max-w-4xl mx-auto px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-6xl md:text-8xl font-playfair font-bold mb-6 leading-tight"
          >
            Welcome to <span className="text-gold">Café Fausse</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-2xl md:text-3xl mb-8 text-cream-light font-light"
          >
            An Unforgettable Fine Dining Experience
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg md:text-xl mb-12 text-cream-light/90 max-w-2xl mx-auto leading-relaxed"
          >
            Italian-inspired cuisine meets modern culinary innovation in the heart of Washington, DC
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="space-x-4"
          >
            <Button asChild size="lg" className="bg-secondary hover:shadow-luxury transition-all duration-300 text-lg px-8 py-4">
              <Link to="/reservations">Reserve Your Table</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-burgundy transition-all duration-300 text-lg px-8 py-4">
              <Link to="/menu">View Menu</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-foreground">
              Why Choose Café Fausse?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of traditional Italian flavors and modern culinary innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-card shadow-elegant hover:shadow-luxury transition-all duration-300 border-0">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-primary rounded-full inline-flex">
                      <feature.icon className="h-8 w-8 text-cream" />
                    </div>
                    <CardTitle className="text-2xl font-playfair text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-lg text-primary leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-foreground">
              Visit Us Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Located in the heart of Washington, DC, we're ready to provide you with an exceptional dining experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MapPinIcon,
                title: "Location",
                details: "1234 Culinary Ave, Suite 100\nWashington, DC 20002",
                delay: 0.2
              },
              {
                icon: PhoneIcon,
                title: "Phone",
                details: "(202) 555-4567",
                delay: 0.4
              },
              {
                icon: ClockIcon,
                title: "Hours",
                details: "Monday–Saturday: 5:00 PM – 11:00 PM\nSunday: 5:00 PM – 9:00 PM",
                delay: 0.6
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: contact.delay }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mx-auto mb-6 p-4 bg-secondary rounded-full inline-flex group-hover:scale-110 transition-transform duration-300">
                  <contact.icon className="h-8 w-8 text-burgundy" />
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {contact.title}
                </h3>
                <p className="text-lg text-muted-foreground whitespace-pre-line leading-relaxed">
                  {contact.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <EnvelopeIcon className="w-12 h-12 mx-auto mb-6 text-cream" />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-cream">
              Stay Connected
            </h2>
            <p className="text-xl text-cream-light/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Subscribe to our newsletter for exclusive offers, special events, and culinary updates from our kitchen to yours.
            </p>
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/60 focus:border-gold"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-secondary hover:shadow-luxury transition-all duration-300 px-6"
              >
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-foreground">
              What Our Guests Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover why food enthusiasts from around the world choose Café Fausse for their special occasions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-card shadow-elegant hover:shadow-luxury transition-all duration-300 border-0">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <CardTitle className="text-xl font-playfair text-foreground">{testimonial.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic text-lg leading-relaxed">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-burgundy">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-cream">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-xl text-cream-light mb-12 max-w-3xl mx-auto leading-relaxed">
              Join us for an evening of exceptional cuisine, elegant ambiance, and impeccable service that will create memories to last a lifetime
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-secondary hover:shadow-luxury transition-all duration-300 text-lg px-12 py-4">
                <Link to="/reservations">Make a Reservation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <CakeIcon className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-playfair font-bold text-primary">
                Café Fausse
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Exceptional fine dining experiences since 2010
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Menu
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                About Us
              </Link>
              <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Gallery
              </Link>
              <Link to="/reservations" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Reservations
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Café Fausse. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
