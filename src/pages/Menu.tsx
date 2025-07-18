import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChefHat, Users, Calendar, Phone } from "lucide-react";

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
              <Link to="/menu" className="text-red-600 font-medium">
                Menu
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-red-600 transition-colors">
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

      {/* Header */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <ChefHat className="w-16 h-16 mx-auto mb-6 text-red-600" />
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Our Menu</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our carefully crafted dishes using the finest seasonal ingredients sourced locally
        </p>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">{section.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-xl font-bold text-red-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Wine Pairing Section */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Wine Pairings</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our sommelier has carefully selected wines to complement each dish. 
            Ask your server about our wine pairing recommendations.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">By the Glass</h3>
              <p className="text-gray-600">Selection of premium wines available by the glass</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Wine Flights</h3>
              <p className="text-gray-600">Curated flights to explore different regions and varietals</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Bottle Service</h3>
              <p className="text-gray-600">Extensive bottle collection from renowned wineries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation CTA */}
      <div className="py-20 px-4 bg-red-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Dine With Us?</h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Reserve your table now to experience our exceptional cuisine and warm hospitality
          </p>
          <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg">
            <Link to="/reservations">Make a Reservation</Link>
          </Button>
        </div>
      </div>

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

export default Menu;