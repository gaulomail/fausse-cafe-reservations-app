import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuSections = [
    {
      title: "Appetizers",
      items: [
        {
          name: "Truffle Arancini",
          description: "Crispy risotto balls with black truffle and parmesan",
          price: "$18",
          dietary: ["vegetarian"]
        },
        {
          name: "Seared Scallops",
          description: "Pan-seared scallops with cauliflower puree and pancetta",
          price: "$24",
          dietary: ["gluten-free"]
        },
        {
          name: "Burrata Caprese",
          description: "Fresh burrata with heirloom tomatoes and basil oil",
          price: "$16",
          dietary: ["vegetarian", "gluten-free"]
        }
      ]
    },
    {
      title: "Main Courses",
      items: [
        {
          name: "Wagyu Beef Tenderloin",
          description: "8oz tenderloin with roasted vegetables and red wine reduction",
          price: "$52",
          dietary: ["gluten-free"]
        },
        {
          name: "Pan-Seared Halibut",
          description: "Fresh halibut with lemon risotto and seasonal vegetables",
          price: "$38",
          dietary: ["gluten-free"]
        },
        {
          name: "Duck Breast",
          description: "Roasted duck breast with cherry gastrique and potato gratin",
          price: "$42",
          dietary: []
        },
        {
          name: "Mushroom Wellington",
          description: "Wild mushroom duxelles in puff pastry with herb sauce",
          price: "$32",
          dietary: ["vegetarian"]
        }
      ]
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Chocolate Soufflé",
          description: "Warm chocolate soufflé with vanilla bean ice cream",
          price: "$14",
          dietary: ["vegetarian"]
        },
        {
          name: "Lemon Tart",
          description: "Classic lemon tart with raspberry coulis",
          price: "$12",
          dietary: ["vegetarian"]
        },
        {
          name: "Tiramisu",
          description: "Traditional tiramisu with espresso and mascarpone",
          price: "$13",
          dietary: ["vegetarian"]
        }
      ]
    }
  ];

  const getDietaryBadgeVariant = (dietary: string) => {
    switch (dietary) {
      case "vegetarian":
        return "secondary";
      case "gluten-free":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">Café Fausse</Link>
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
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.dietary.map((diet) => (
                            <Badge key={diet} variant={getDietaryBadgeVariant(diet)} className="text-xs">
                              {diet}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-primary ml-4">{item.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{item.description}</CardDescription>
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
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our sommelier has carefully selected wines to complement each dish. 
            Ask your server about our wine pairing recommendations.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>By the Glass</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Selection of premium wines available by the glass</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wine Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Curated flights to explore different regions and varietals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bottle Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Extensive bottle collection from renowned wineries</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reservation CTA */}
      <div className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dine With Us?</h2>
          <p className="text-xl text-muted-foreground mb-8">
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
          <p className="text-muted-foreground mb-4">Exceptional dining experiences since 2025</p>
          <p className="text-sm text-muted-foreground">
            © 2025 Café Fausse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;