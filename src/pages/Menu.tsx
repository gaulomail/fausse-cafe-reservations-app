import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChefHat, Users, Calendar, Phone, MapPin, Clock, Star, Wine, Leaf } from "lucide-react";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const Menu = () => {
  const menuSections = [
    {
      title: "Appetizers",
      emoji: "🥗",
      items: [
        {
          name: "Truffle Arancini",
          description: "Crispy risotto balls with black truffle, aged parmesan, and saffron aioli",
          price: "$16",
          image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=300&h=200&fit=crop",
          dietary: ["Vegetarian"],
          popular: true
        },
        {
          name: "Pan-Seared Scallops",
          description: "Diver scallops with cauliflower purée, pancetta crisps, and micro herbs",
          price: "$24",
          image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=300&h=200&fit=crop",
          dietary: ["Gluten-Free"]
        },
        {
          name: "Burrata Caprese",
          description: "House-made burrata, heirloom tomatoes, basil oil, and aged balsamic",
          price: "$18",
          image: "https://images.unsplash.com/photo-1608697707493-6d9d6bb45e9b?w=300&h=200&fit=crop",
          dietary: ["Vegetarian", "Gluten-Free"]
        },
        {
          name: "Duck Liver Mousse",
          description: "Silky mousse with cherry compote, brioche toast, and pistachios",
          price: "$19",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop"
        }
      ]
    },
    {
      title: "Main Courses", 
      emoji: "🍽️",
      items: [
        {
          name: "Wagyu Beef Tenderloin",
          description: "8oz A5 Wagyu with roasted bone marrow, seasonal vegetables, and red wine jus",
          price: "$65",
          image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop",
          popular: true,
          chefSpecial: true
        },
        {
          name: "Lobster Thermidor",
          description: "Maine lobster tail with cognac cream sauce, gruyère, and herb crust",
          price: "$48",
          image: "https://images.unsplash.com/photo-1625944228973-b67b81c54d5a?w=300&h=200&fit=crop",
          dietary: ["Gluten-Free"]
        },
        {
          name: "Rack of Lamb",
          description: "Herb-crusted New Zealand lamb with ratatouille and rosemary jus",
          price: "$42",
          image: "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=300&h=200&fit=crop",
          dietary: ["Gluten-Free"]
        },
        {
          name: "Wild Mushroom Risotto",
          description: "Creamy Arborio with porcini, shiitake, truffle oil, and aged parmesan",
          price: "$28",
          image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop",
          dietary: ["Vegetarian", "Gluten-Free"]
        },
        {
          name: "Chilean Sea Bass",
          description: "Miso-glazed sea bass with bok choy, jasmine rice, and ginger-soy reduction",
          price: "$38",
          image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=300&h=200&fit=crop",
          dietary: ["Gluten-Free"]
        }
      ]
    },
    {
      title: "Desserts",
      emoji: "🍰",
      items: [
        {
          name: "Chocolate Soufflé",
          description: "Warm dark chocolate soufflé with vanilla bean ice cream and gold leaf",
          price: "$14",
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop",
          popular: true
        },
        {
          name: "Crème Brûlée Trio",
          description: "Vanilla, lavender, and espresso crème brûlée with seasonal berries",
          price: "$12",
          image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=300&h=200&fit=crop"
        },
        {
          name: "Lemon Tart",
          description: "Meyer lemon curd, almond shortbread crust, and candied lemon zest",
          price: "$11",
          image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop",
          dietary: ["Vegetarian"]
        },
        {
          name: "Tiramisu",
          description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
          price: "$10",
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
          dietary: ["Vegetarian"]
        }
      ]
    }
  ];

  const wineCategories = [
    {
      title: "Champagne & Sparkling",
      emoji: "🥂",
      selections: ["Dom Pérignon Vintage", "Krug Grande Cuvée", "Billecart-Salmon Rosé"]
    },
    {
      title: "Red Wine",
      emoji: "🍷",
      selections: ["Bordeaux Grand Cru", "Barolo DOCG", "Napa Valley Cabernet"]
    },
    {
      title: "White Wine", 
      emoji: "🥂",
      selections: ["Chablis Premier Cru", "Sancerre", "German Riesling"]
    }
  ];

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
              <Link to="/menu" className="text-white font-semibold bg-primary-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Menu
              </Link>
              <Link to="/about" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
                About
              </Link>
              <Link to="/gallery" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
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
            <div className="text-6xl mb-6">🍽️</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Culinary Excellence
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/95 font-light max-w-3xl mx-auto drop-shadow-md">
              Discover our chef's artfully crafted dishes, featuring premium ingredients and innovative techniques
            </p>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-20">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">{section.emoji}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">{section.title}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {section.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-2 relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {item.popular && (
                        <Badge className="absolute top-3 left-3 bg-primary-600 text-white border-0">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {item.chefSpecial && (
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-0">
                          <ChefHat className="w-3 h-3 mr-1" />
                          Chef's Special
                        </Badge>
                      )}
                    </div>
                    <div className="md:col-span-3 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-xl md:text-2xl font-bold text-primary-600 ml-4">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                        {item.description}
                      </p>
                      {item.dietary && (
                        <div className="flex flex-wrap gap-2">
                          {item.dietary.map((diet, dietIndex) => (
                            <Badge key={dietIndex} variant="outline" className="text-xs border-primary-200 text-primary-600">
                              <Leaf className="w-3 h-3 mr-1" />
                              {diet}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Wine Selection Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🍷</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6">Wine Selection</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              Our sommelier has curated an exceptional wine collection featuring renowned vineyards from around the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {wineCategories.map((category, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-primary-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{category.emoji}</div>
                  <CardTitle className="text-xl font-bold text-primary-700">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.selections.map((wine, wineIndex) => (
                      <li key={wineIndex} className="text-gray-700 flex items-center">
                        <Wine className="w-4 h-4 text-primary-500 mr-2" />
                        {wine}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-primary-600 font-medium mb-4">
              Wine pairings available for all courses • Ask your sommelier for recommendations
            </p>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              View Full Wine List
            </Button>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Experience Excellence?</h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Book your table now and embark on a culinary journey that will create lasting memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/reservations" className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Make a Reservation
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              <Link to="/about">
                Meet Our Chef
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
                Creating exceptional dining experiences with world-class cuisine and unparalleled service since 2010.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/reservations" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  Reservations
                </Link>
                <Link to="/about" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
                <Link to="/gallery" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  Gallery
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

export default Menu;