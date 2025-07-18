import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, MapPin, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import HeroBookingForm from "@/components/HeroBookingForm";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Café Fausse
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-coral-600 font-medium">
                Home
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-coral-600 transition-colors">
                Menu
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-coral-600 transition-colors">
                About
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-coral-600 transition-colors">
                Gallery
              </Link>
              <Link to="/reservations" className="text-gray-700 hover:text-coral-600 transition-colors">
                Reservations
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button asChild variant="ghost" className="text-gray-700 hover:text-coral-600">
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="bg-coral-600 hover:bg-coral-700 text-white">
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dineplan Style */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${restaurantHero})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Instant online bookings
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 font-light">
            Explore over 2,000 restaurants
          </p>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
            <HeroBookingForm />
          </div>

          {/* Category Buttons */}
          <div className="mt-12">
            <p className="text-white/80 mb-6 text-lg">Or browse featured categories:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-coral-600 hover:bg-coral-700 text-white rounded-full px-6 py-3">
                <Link to="/menu">Restaurant Specials</Link>
              </Button>
              <Button className="bg-coral-600 hover:bg-coral-700 text-white rounded-full px-6 py-3">
                <Link to="/about">New to Dineplan</Link>
              </Button>
              <Button className="bg-coral-600 hover:bg-coral-700 text-white rounded-full px-6 py-3">
                <Link to="/gallery">Reviewers' Choice Awards</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Popular Cuisines</h2>
            <div className="w-16 h-1 bg-coral-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Italian", icon: "🍝" },
              { name: "Fine Dining", icon: "🍷" },
              { name: "Contemporary", icon: "🎨" },
              { name: "Steakhouse", icon: "🥩" }
            ].map((cuisine, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg mx-auto mb-4 flex items-center justify-center text-4xl group-hover:shadow-xl transition-shadow">
                  {cuisine.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-coral-600 transition-colors">
                  {cuisine.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Have you tried our app?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Use the Dineplan app for easy restaurant browsing and hassle-free bookings.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-black text-white px-6 py-3 rounded-lg">
                  Download on the App Store
                </Button>
                <Button className="bg-black text-white px-6 py-3 rounded-lg">
                  Get it on Google Play
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-lg shadow-lg mx-auto flex items-center justify-center text-6xl">
                📱
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Choose Café Fausse?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience exceptional dining with our award-winning cuisine and impeccable service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Award-Winning Excellence",
                description: "Winner of multiple culinary awards and recognition for outstanding service",
                icon: "🏆"
              },
              {
                title: "Fresh Local Ingredients",
                description: "Sourced daily from local farms to ensure the highest quality and freshness",
                icon: "🌱"
              },
              {
                title: "Exceptional Service",
                description: "Our trained staff provides attentive service to make your evening special",
                icon: "⭐"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-coral-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready for an Unforgettable Experience?</h2>
          <p className="text-xl text-red-100 mb-10 max-w-3xl mx-auto">
            Join us for an evening of exceptional cuisine, elegant ambiance, and impeccable service
          </p>
          <Button className="bg-white text-coral-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-lg">
            <Link to="/reservations">Make a Reservation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-white">Café Fausse</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Exceptional dining experiences since 2010. We blend traditional flavors 
                with modern culinary innovation to create unforgettable moments.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  Download Our App
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/menu" className="block text-gray-400 hover:text-white transition-colors">
                  Menu
                </Link>
                <Link to="/reservations" className="block text-gray-400 hover:text-white transition-colors">
                  Reservations
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to="/gallery" className="block text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <p>123 Culinary Street</p>
                <p>Gourmet District, NY 10001</p>
                <p>(202) 555-4567</p>
                <p>hello@cafefausse.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Café Fausse. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
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

export default Index;