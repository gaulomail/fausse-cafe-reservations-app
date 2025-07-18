import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, Star, Camera, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      alt: "Restaurant interior with elegant lighting",
      category: "Interior"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      alt: "Signature pasta dish",
      category: "Food"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      alt: "Fine dining table setting",
      category: "Interior"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
      alt: "Grilled salmon with vegetables",
      category: "Food"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      alt: "Chef preparing fresh pasta",
      category: "Behind the Scenes"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      alt: "Elegant tiramisu dessert",
      category: "Food"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop",
      alt: "Cozy dining area",
      category: "Interior"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",
      alt: "Special event celebration",
      category: "Events"
    }
  ];

  const awards = [
    {
      title: "Culinary Excellence Award",
      year: "2022",
      description: "Recognized for outstanding culinary innovation and quality"
    },
    {
      title: "Restaurant of the Year",
      year: "2023", 
      description: "Top dining establishment in the metropolitan area"
    },
    {
      title: "Best Fine Dining Experience",
      year: "2023",
      organization: "Foodie Magazine",
      description: "Exceptional service and unforgettable atmosphere"
    }
  ];

  const reviews = [
    {
      quote: "Exceptional ambiance and unforgettable flavors.",
      source: "Gourmet Review",
      rating: 5
    },
    {
      quote: "A must-visit restaurant for food enthusiasts.",
      source: "The Daily Bite",
      rating: 5
    },
    {
      quote: "Every dish is a masterpiece, every moment memorable.",
      source: "Culinary Times",
      rating: 5
    },
    {
      quote: "The perfect blend of tradition and innovation.",
      source: "Fine Dining Weekly",
      rating: 5
    }
  ];

  const categories = ["All", "Interior", "Food", "Behind the Scenes", "Events"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(image => image.category === selectedCategory);

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
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/gallery" className="text-primary font-medium">
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
      <section className="py-24 px-4 bg-gradient-hero text-center">
        <div className="container mx-auto">
          <Camera className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-foreground">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the beauty of Café Fausse through our collection of memorable moments, 
            exquisite dishes, and elegant ambiance.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-elegant transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">
                        {image.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{image.alt}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-playfair font-bold mb-4">Awards & Recognition</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're honored to be recognized for our commitment to culinary excellence and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="text-center border-border bg-card hover:shadow-gold transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-playfair text-xl">{award.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold text-lg">
                    {award.year} {award.organization && `• ${award.organization}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-playfair font-bold mb-4">What Our Guests Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read what food critics and our valued customers have to say about their experiences at Café Fausse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-lg italic text-foreground">
                    "{review.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-primary font-semibold">— {review.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-gold">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-primary-foreground">Create Your Own Memories</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Experience the ambiance, taste the excellence, and become part of our story.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/reservations">Book Your Table</Link>
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

export default Gallery;