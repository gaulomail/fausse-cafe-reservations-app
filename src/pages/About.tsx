import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Heart, Leaf, Award, Phone } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Café Fausse
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
                Menu
              </Link>
              <Link to="/about" className="text-red-600 font-medium">
                About
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-red-600 transition-colors">
                Gallery
              </Link>
              <Link to="/reservations" className="text-gray-700 hover:text-red-600 transition-colors">
                Reservations
              </Link>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium">
                <Link to="/reservations">Book Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-red-600" />
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends 
            traditional Italian flavors with modern culinary innovation to create unforgettable dining experiences.
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
      <section className="py-20 px-4 bg-red-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Experience Our Story</h2>
          <p className="text-xl text-red-100 mb-10 max-w-3xl mx-auto">
            Join us for an evening where tradition meets innovation, and every dish tells a story of passion and excellence.
          </p>
          <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg">
            <Link to="/reservations">Reserve Your Table</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Café Fausse</h3>
              <p className="text-gray-400 mb-4">Exceptional dining experiences since 2010</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  (202) 555-4567
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Hours</h4>
              <div className="text-gray-400 space-y-1">
                <p>Mon-Sat: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 5:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2025 Café Fausse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;