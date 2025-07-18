import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, Star, Camera, Heart, Phone, MapPin, Clock, Calendar, ChefHat, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      alt: "Elegant dining room with crystal chandeliers and warm ambiance",
      category: "Interior Design"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      alt: "Signature truffle pasta with aged parmesan",
      category: "Signature Dishes"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      alt: "Fine dining table setting with premium silverware",
      category: "Table Settings"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
      alt: "Pan-seared salmon with seasonal vegetables",
      category: "Signature Dishes"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      alt: "Chef Laurent preparing fresh handmade pasta",
      category: "Kitchen Stories"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      alt: "Artisan tiramisu with gold leaf garnish",
      category: "Dessert Artistry"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop",
      alt: "Intimate dining area with fireplace",
      category: "Interior Design"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop",
      alt: "Anniversary celebration with champagne service",
      category: "Special Events"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
      alt: "Wagyu beef preparation with molecular techniques",
      category: "Kitchen Stories"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
      alt: "Chocolate soufflé with vanilla bean ice cream",
      category: "Dessert Artistry"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&h=600&fit=crop",
      alt: "Wine cellar with vintage collection",
      category: "Wine Collection"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1515669097368-22e68403d87b?w=800&h=600&fit=crop",
      alt: "Private dining room for intimate gatherings",
      category: "Private Events"
    }
  ];

  const awards = [
    {
      title: "Michelin Star",
      year: "2018-2024",
      organization: "Michelin Guide",
      description: "Consistently awarded for exceptional culinary excellence and service",
      icon: "⭐"
    },
    {
      title: "World's 50 Best Restaurants",
      year: "2023", 
      organization: "The World's 50 Best",
      description: "Ranked among the globe's finest dining establishments",
      icon: "🌍"
    },
    {
      title: "James Beard Nomination",
      year: "2022",
      organization: "James Beard Foundation",
      description: "Outstanding Restaurant nominee for culinary excellence",
      icon: "🏆"
    },
    {
      title: "Wine Spectator Grand Award",
      year: "2021-2024",
      organization: "Wine Spectator",
      description: "Recognized for exceptional wine program and cellar",
      icon: "🍷"
    }
  ];

  const reviews = [
    {
      quote: "An extraordinary culinary journey that transcends typical fine dining. Every course is a masterpiece.",
      source: "Food & Wine Magazine",
      rating: 5,
      reviewer: "James Patterson, Food Critic"
    },
    {
      quote: "Café Fausse represents the pinnacle of gastronomic achievement. Absolutely flawless execution.",
      source: "Michelin Guide",
      rating: 5,
      reviewer: "Sarah Chen, Inspector"
    },
    {
      quote: "The perfect harmony of innovation and tradition. This is destination dining at its finest.",
      source: "Condé Nast Traveler",
      rating: 5,
      reviewer: "Michael Torres, Editor"
    },
    {
      quote: "An unforgettable experience that engages all senses. The attention to detail is remarkable.",
      source: "The New York Times",
      rating: 5,
      reviewer: "Emma Rodriguez, Critic"
    }
  ];

  const categories = ["All", "Signature Dishes", "Interior Design", "Kitchen Stories", "Dessert Artistry", "Wine Collection", "Special Events", "Private Events", "Table Settings"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 relative z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-all duration-300 transform hover:scale-105">
              Café Fausse
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
                Home
              </Link>
              <Link to="/menu" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
                Menu
              </Link>
              <Link to="/about" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
                About
              </Link>
              <Link to="/gallery" className="text-white font-semibold bg-primary-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Gallery
              </Link>
              <Link to="/reservations" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
                Reservations
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${restaurantHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-fade-in">
            <div className="text-6xl mb-6">📸</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Visual Stories
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/95 font-light max-w-3xl mx-auto drop-shadow-md">
              Experience the artistry, elegance, and passion that defines every moment at Café Fausse
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-primary-600 text-white shadow-lg hover:bg-primary-700" 
                    : "border-primary-300 text-primary-600 hover:bg-primary-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-primary-200">
                    <div className="relative overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <Badge className="absolute top-3 right-3 bg-primary-600/90 text-white border-0 shadow-lg">
                        {image.category}
                      </Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-xs text-gray-800 font-medium truncate">{image.alt}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg mb-2">{image.alt}</h3>
                      <Badge className="bg-primary-600 text-white border-0">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">Awards & Recognition</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              Our commitment to culinary excellence has been recognized by the world's most prestigious culinary institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="text-center bg-white/80 backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-primary-200">
                <CardHeader>
                  <div className="text-4xl mb-4">{award.icon}</div>
                  <CardTitle className="text-lg font-bold text-primary-700">{award.title}</CardTitle>
                  <CardDescription className="text-primary-600 font-semibold">
                    {award.year} • {award.organization}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">💎</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">Critical Acclaim</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what the world's most respected food critics and publications say about Café Fausse
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-lg italic text-gray-700 leading-relaxed">
                    "{review.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-t border-primary-200 pt-4">
                    <p className="text-primary-700 font-semibold text-sm">{review.reviewer}</p>
                    <p className="text-primary-600 font-medium text-sm">{review.source}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Create Your Own Story</h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Experience the artistry, taste the excellence, and become part of our visual legacy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/reservations" className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Experience
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              <Link to="/menu">
                Explore Our Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">Café Fausse</h3>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Creating visual stories through exceptional dining experiences, where every moment is crafted to perfection.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/menu" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  Menu
                </Link>
                <Link to="/about" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
                <Link to="/reservations" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  Reservations
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-primary-400" />
                  <div>
                    <p>123 Culinary Street</p>
                    <p>Gourmet District, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-primary-400" />
                  <p>(202) 555-4567</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-3 text-primary-400" />
                  <p>Mon-Sat: 5PM-11PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Café Fausse. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                <Link to="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;