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
      <nav className="bg-white shadow-lg border-b border-gray-100 relative z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              Café Fausse
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1">
                Home
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Menu
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Gallery
              </Link>
              <Link to="/reservations" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Reservations
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm px-3 py-1 bg-gray-50 rounded-full">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-primary-600 hover:bg-primary-50">
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-md">
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" className="text-primary-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${restaurantHero})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-primary-100">
            Instant online bookings
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-white/90 font-light max-w-3xl mx-auto">
            Explore exceptional dining experiences
          </p>

          {/* Booking Form - Mobile Responsive */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-5xl mx-auto shadow-2xl">
            <HeroBookingForm />
          </div>

          {/* Category Buttons - Mobile Responsive */}
          <div className="mt-8 md:mt-12">
            <p className="text-white/80 mb-4 md:mb-6 text-base md:text-lg">Or browse featured categories:</p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base shadow-lg hover:shadow-xl transition-all">
                <Link to="/menu">Restaurant Specials</Link>
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base shadow-lg hover:shadow-xl transition-all">
                <Link to="/about">About Our Story</Link>
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base shadow-lg hover:shadow-xl transition-all">
                <Link to="/gallery">Photo Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-600">Popular Cuisines</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Discover our carefully curated selection of culinary experiences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Italian", icon: "🍝" },
              { name: "Fine Dining", icon: "🍷" },
              { name: "Contemporary", icon: "🎨" },
              { name: "Steakhouse", icon: "🥩" }
            ].map((cuisine, index) => (
              <div key={index} className="text-center group cursor-pointer p-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg mx-auto mb-4 flex items-center justify-center text-3xl md:text-4xl group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  {cuisine.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
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

      {/* CTA Section - Mobile Optimized */}
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Ready for an Unforgettable Experience?</h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8 md:mb-10 max-w-3xl mx-auto">
            Join us for an evening of exceptional cuisine, elegant ambiance, and impeccable service
          </p>
          <Button className="bg-white text-primary-600 hover:bg-gray-50 px-6 md:px-8 py-3 text-base md:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
            <Link to="/reservations">Make a Reservation</Link>
          </Button>
        </div>
      </section>

      {/* Footer - Mobile Responsive */}
      <footer className="bg-gray-900 py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">Café Fausse</h3>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Exceptional dining experiences since 2010. We blend traditional flavors 
                with modern culinary innovation to create unforgettable moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white transition-all">
                  Download Our App
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/menu" className="block text-gray-300 hover:text-primary-400 transition-colors">
                  Menu
                </Link>
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
              <div className="space-y-3 text-gray-300">
                <p>123 Culinary Street</p>
                <p>Gourmet District, NY 10001</p>
                <p className="hover:text-primary-400 transition-colors cursor-pointer">(202) 555-4567</p>
                <p className="hover:text-primary-400 transition-colors cursor-pointer">hello@cafefausse.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 md:pt-8">
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

export default Index;