import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuSections = [
    {
      title: "Starters",
      items: [
        {
          name: "Bruschetta",
          description: "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
          price: "$8.50"
        },
        {
          name: "Caesar Salad", 
          description: "Crisp romaine with homemade Caesar dressing",
          price: "$9.00"
        }
      ]
    },
    {
      title: "Main Courses",
      items: [
        {
          name: "Grilled Salmon",
          description: "Served with lemon butter sauce and seasonal vegetables",
          price: "$22.00"
        },
        {
          name: "Ribeye Steak",
          description: "12 oz prime cut with garlic mashed potatoes",
          price: "$28.00"
        },
        {
          name: "Vegetable Risotto",
          description: "Creamy Arborio rice with wild mushrooms", 
          price: "$18.00"
        }
      ]
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Tiramisu",
          description: "Classic Italian dessert with mascarpone",
          price: "$7.50"
        },
        {
          name: "Cheesecake",
          description: "Creamy cheesecake with berry compote",
          price: "$7.00"
        }
      ]
    },
    {
      title: "Beverages",
      items: [
        {
          name: "Red Wine (Glass)",
          description: "A selection of Italian reds",
          price: "$10.00"
        },
        {
          name: "White Wine (Glass)",
          description: "Crisp and refreshing",
          price: "$9.00"
        },
        {
          name: "Craft Beer",
          description: "Local artisan brews",
          price: "$6.00"
        },
        {
          name: "Espresso",
          description: "Strong and aromatic",
          price: "$3.00"
        }
      ]
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
              <Link to="/menu" className="text-primary font-medium">
                Menu
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

      {/* Header */}
      <div className="py-12 px-4 text-center bg-muted/30">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-xl text-primary max-w-2xl mx-auto">
          Discover our carefully crafted dishes using the finest seasonal ingredients
        </p>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-12">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {section.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
                      </div>
                      <span className="text-2xl font-bold text-primary ml-4">{item.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-primary">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Wine Pairing Section */}
      <div className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Wine Pairings Available</h2>
          <p className="text-lg text-primary mb-8 max-w-2xl mx-auto">
            Our sommelier has carefully selected wines to complement each dish. 
            Ask your server about our wine pairing recommendations.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>By the Glass</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary">Selection of premium wines available by the glass</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wine Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary">Curated flights to explore different regions and varietals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bottle Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary">Extensive bottle collection from renowned wineries</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reservation CTA */}
      <div className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dine With Us?</h2>
          <p className="text-xl text-primary mb-8">
            Reserve your table now to experience our exceptional cuisine
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/reservations">Make a Reservation</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Café Fausse</h3>
          <p className="text-primary mb-4">Exceptional dining experiences since 2025</p>
          <p className="text-sm text-primary">
            © 2025 Café Fausse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;