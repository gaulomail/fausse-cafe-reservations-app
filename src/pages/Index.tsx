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
      {/* Navigation - Enhanced Design */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 relative z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-all duration-300 transform hover:scale-105">
              Café Fausse
            </Link>
            
            {/* Desktop Navigation - Updated Colors */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-white font-semibold bg-primary-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Home
              </Link>
              <Link to="/menu" className="text-primary-600 hover:text-primary-700 transition-all duration-300 font-medium hover:bg-primary-50 px-3 py-2 rounded-lg">
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
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full border border-primary-200">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <span className="text-primary-700 text-sm font-medium">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button asChild variant="outline" size="sm" className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 transition-all duration-300 font-medium">
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button - Enhanced */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced Design */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: `url(${restaurantHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg">
              Instant online bookings
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-white/95 font-light max-w-3xl mx-auto drop-shadow-md">
              Explore exceptional dining experiences at Café Fausse
            </p>
          </div>

          {/* Booking Form - Enhanced Design */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-5xl mx-auto shadow-2xl border border-white/20 animate-slide-up">
            <HeroBookingForm />
          </div>

          {/* Category Buttons - Outline Design with #dd524c */}
          <div className="mt-8 md:mt-12 animate-fade-in">
            <p className="text-white/90 mb-4 md:mb-6 text-base md:text-lg font-medium drop-shadow-sm">Or browse featured categories:</p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
              <Button variant="outline" className="border-2 border-primary-500 text-primary-100 hover:bg-primary-500 hover:text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/10">
                <Link to="/menu">Restaurant Specials</Link>
              </Button>
              <Button variant="outline" className="border-2 border-primary-500 text-primary-100 hover:bg-primary-500 hover:text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/10">
                <Link to="/about">About Our Story</Link>
              </Button>
              <Button variant="outline" className="border-2 border-primary-500 text-primary-100 hover:bg-primary-500 hover:text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/10">
                <Link to="/gallery">Photo Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines Section - Enhanced Design */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-600">Popular Cuisines</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Discover our carefully curated selection of culinary experiences crafted with passion
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Italian", icon: "🍝", color: "from-red-50 to-red-100" },
              { name: "Fine Dining", icon: "🍷", color: "from-purple-50 to-purple-100" },
              { name: "Contemporary", icon: "🎨", color: "from-blue-50 to-blue-100" },
              { name: "Steakhouse", icon: "🥩", color: "from-orange-50 to-orange-100" }
            ].map((cuisine, index) => (
              <div key={index} className="text-center group cursor-pointer p-4 rounded-xl hover:bg-primary-50 transition-all duration-300">
                <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${cuisine.color} rounded-full shadow-lg mx-auto mb-4 flex items-center justify-center text-3xl md:text-4xl group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-white`}>
                  {cuisine.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  {cuisine.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section - Enhanced */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-700">Have you tried our app?</h2>
              <p className="text-lg md:text-xl text-primary-600 mb-6 md:mb-8 leading-relaxed">
                Use the Café Fausse app for easy restaurant browsing and hassle-free bookings with exclusive mobile offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl shadow-xl mx-auto flex items-center justify-center text-5xl md:text-6xl transform hover:scale-105 transition-all duration-300">
                📱
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-primary-600">Why Choose Café Fausse?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience exceptional dining with our award-winning cuisine and impeccable service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Award-Winning Excellence",
                description: "Winner of multiple culinary awards and recognition for outstanding service and innovation",
                icon: "🏆",
                gradient: "from-yellow-50 to-yellow-100"
              },
              {
                title: "Fresh Local Ingredients",
                description: "Sourced daily from local farms to ensure the highest quality and freshness in every dish",
                icon: "🌱",
                gradient: "from-green-50 to-green-100"
              },
              {
                title: "Exceptional Service",
                description: "Our trained staff provides attentive service to make your evening truly special and memorable",
                icon: "⭐",
                gradient: "from-blue-50 to-blue-100"
              }
            ].map((feature, index) => (
              <div key={index} className={`text-center bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white`}>
                <div className="text-4xl md:text-5xl mb-4 md:mb-6">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary-700">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Ready for an Unforgettable Experience?</h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Join us for an evening of exceptional cuisine, elegant ambiance, and impeccable service that will create lasting memories
          </p>
          <Button className="bg-white text-primary-600 hover:bg-gray-50 hover:shadow-xl px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            <Link to="/reservations" className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Make a Reservation
            </Link>
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