import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Heart, Leaf, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const founders = [
    {
      name: "Chef Antonio Rossi",
      role: "Head Chef & Co-Founder",
      bio: "With over 20 years of culinary experience in Milan and Rome, Chef Antonio brings authentic Italian traditions to every dish. His passion for innovation while respecting classic techniques has earned him recognition throughout the culinary world.",
      specialties: ["Italian Cuisine", "Pasta Making", "Wine Pairing"]
    },
    {
      name: "Maria Lopez",
      role: "Restaurateur & Co-Founder", 
      bio: "Maria's vision for exceptional hospitality and sustainable dining practices has shaped Café Fausse's warm atmosphere. Her commitment to locally sourced ingredients and community partnerships drives our restaurant's mission.",
      specialties: ["Hospitality", "Sustainability", "Community Relations"]
    }
  ];

  const values = [
    {
      icon: ChefHat,
      title: "Culinary Excellence",
      description: "Every dish is crafted with precision, passion, and the finest ingredients to deliver an unforgettable dining experience."
    },
    {
      icon: Heart,
      title: "Exceptional Service",
      description: "Our team is dedicated to providing warm, attentive service that makes every guest feel welcomed and valued."
    },
    {
      icon: Leaf,
      title: "Local Sourcing",
      description: "We partner with local farms and suppliers to ensure fresh, seasonal ingredients while supporting our community."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-playfair font-bold text-primary">Café Fausse</Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/menu" className="text-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link to="/reservations" className="text-foreground hover:text-primary transition-colors">
                Reservations
              </Link>
              <Link to="/about" className="text-primary font-medium">
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
      <section className="py-24 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-foreground">
            Our Story
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto">
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends 
            traditional Italian flavors with modern culinary innovation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-primary leading-relaxed mb-12">
              Our mission is to provide an unforgettable dining experience that reflects both quality and creativity. 
              We are committed to excellence in every aspect of our service, from our carefully crafted dishes to 
              our warm hospitality. At Café Fausse, we believe in honoring culinary traditions while embracing 
              innovation, creating memorable moments for every guest who walks through our doors.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border bg-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="font-playfair">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Meet Our Founders</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair">{founder.name}</CardTitle>
                  <CardDescription className="text-primary font-medium text-lg">
                    {founder.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-primary leading-relaxed">{founder.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {founder.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold mb-8">Our Commitment</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-4 text-primary">Locally Sourced Ingredients</h3>
                <p className="text-primary">
                  We partner with local farms and artisans to source the freshest, highest-quality ingredients. 
                  This commitment to local sourcing not only ensures exceptional flavor but also supports our 
                  community and reduces our environmental impact.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-4 text-primary">Unforgettable Dining</h3>
                <p className="text-primary">
                  Every detail at Café Fausse is designed to create lasting memories. From our carefully curated 
                  wine selection to our attentive service, we strive to exceed expectations and provide an 
                  experience that brings guests back time and time again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-gold">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-primary-foreground">Experience Our Story</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join us for an evening where tradition meets innovation, and every dish tells a story.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/reservations">Reserve Your Table</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-playfair font-semibold mb-2 text-primary">Café Fausse</h3>
          <p className="text-primary mb-4">Exceptional dining experiences since 2010</p>
          <p className="text-sm text-primary">
            © 2025 Café Fausse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;