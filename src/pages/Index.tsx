import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, MapPin, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import HeroBookingForm from "@/components/HeroBookingForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
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

      {/* Hero Section - Side-by-Side Layout */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: `url(${restaurantHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Welcome Content */}
            <div className="text-center lg:text-left text-white animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg">
                Instant online bookings
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/95 font-light drop-shadow-md">
                Explore exceptional dining experiences at Café Fausse
              </p>
              
              {/* Category Buttons */}
              <div className="animate-fade-in">
                <p className="text-white/90 mb-4 md:mb-6 text-base md:text-lg font-medium drop-shadow-sm">Browse featured categories:</p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
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

            {/* Right Side - Booking Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 animate-slide-up">
              <HeroBookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines Section - Stunning Redesign */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-30" aria-hidden="true">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-br from-primary-100 via-primary-200 to-primary-50 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-primary-700 drop-shadow-lg">Popular Cuisines</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
              Discover our carefully curated selection of culinary experiences crafted with passion
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {[
              {
                name: "Starters",
                icon: "🥗",
                subtitle: "Fresh beginnings",
                gradient: "from-green-100 via-lime-100 to-emerald-100",
                shadow: "shadow-green-200/40"
              },
              {
                name: "Main Courses",
                icon: "🍽️",
                subtitle: "Hearty & exquisite mains",
                gradient: "from-yellow-100 via-orange-100 to-red-100",
                shadow: "shadow-yellow-200/40"
              },
              {
                name: "Desserts",
                icon: "🍰",
                subtitle: "Sweet finishes",
                gradient: "from-pink-100 via-yellow-100 to-white",
                shadow: "shadow-pink-200/40"
              },
              {
                name: "Beverages",
                icon: "🍷",
                subtitle: "Wines, beer & more",
                gradient: "from-purple-100 via-pink-100 to-indigo-100",
                shadow: "shadow-purple-200/40"
              }
            ].map((cuisine, index) => (
              <div
                key={index}
                className={`relative group rounded-3xl bg-gradient-to-br ${cuisine.gradient} ${cuisine.shadow} p-8 md:p-10 flex flex-col items-center justify-center glass-card border border-white/60 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-20 cursor-pointer`}
                tabIndex={0}
                aria-label={cuisine.name}
              >
                <Link
                  to={`/menu#menu-${cuisine.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="absolute inset-0 z-10"
                  tabIndex={-1}
                  aria-label={`Go to ${cuisine.name} menu`}
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-600 text-white rounded-full shadow-md">Explore</span>
                </div>
                <div className="text-6xl md:text-7xl mb-6 drop-shadow-xl select-none" aria-hidden="true">{cuisine.icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2 drop-shadow-sm">{cuisine.name}</h3>
                <p className="text-base md:text-lg text-gray-700 font-medium mb-2 opacity-80">{cuisine.subtitle}</p>
                <div className="mt-4 w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-60"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu & Story Section - Modern Card Design */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Our Menu Card */}
            <div className="relative group rounded-3xl bg-gradient-to-br from-white via-primary-50 to-primary-100 shadow-xl p-10 flex flex-col items-center justify-center border border-primary-100 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-600 text-white rounded-full shadow-md">Explore</span>
              </div>
              <div className="text-6xl md:text-7xl mb-6 drop-shadow-xl select-none" aria-hidden="true">🍽️</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-3 drop-shadow-sm">Our Menu</h2>
              <p className="text-lg md:text-xl text-gray-700 font-medium mb-6 opacity-90 text-center max-w-md">
                Discover a world of flavor with our curated selection of appetizers, main courses, and desserts—crafted to delight every palate.
              </p>
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300">
                <Link to="/menu" className="flex items-center">
                  View Menu
                </Link>
              </Button>
            </div>
            {/* Our Story Card */}
            <div className="relative group rounded-3xl bg-gradient-to-br from-primary-100 via-white to-primary-50 shadow-xl p-10 flex flex-col items-center justify-center border border-primary-100 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-600 text-white rounded-full shadow-md">Learn More</span>
              </div>
              <div className="text-6xl md:text-7xl mb-6 drop-shadow-xl select-none" aria-hidden="true">📖</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-3 drop-shadow-sm">Our Story</h2>
              <p className="text-lg md:text-xl text-gray-700 font-medium mb-6 opacity-90 text-center max-w-md">
                Since 2010, Café Fausse has blended tradition and innovation to create unforgettable dining experiences. Discover our journey and philosophy.
              </p>
              <Button asChild variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                <Link to="/about" className="flex items-center">
                  Read Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Premium Glassy Redesign */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] h-64 bg-white/60 rounded-full blur-2xl opacity-40 pointer-events-none select-none" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary-700 tracking-tight drop-shadow">Why Choose Café Fausse?</h2>
            <div className="w-24 h-1 bg-primary-200 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover what makes us the destination for unforgettable dining experiences.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Award-Winning Excellence",
                description: "Multiple culinary awards and recognition for outstanding service and innovation.",
                icon: "🏆"
              },
              {
                title: "Fresh Local Ingredients",
                description: "Sourced daily from local farms for the highest quality and flavor in every dish.",
                icon: "🌱"
              },
              {
                title: "Exceptional Service",
                description: "Attentive, professional staff dedicated to making your evening truly special.",
                icon: "⭐"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white/80 backdrop-blur-lg border border-primary-100 rounded-3xl shadow-xl p-10 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/95"
                style={{ minHeight: '340px' }}
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-50 shadow-md mb-6 mt-2 border border-primary-100">
                  <span className="text-5xl md:text-6xl select-none" aria-hidden="true">{feature.icon}</span>
                </div>
                <h3 className="text-2xl md:text-2xl font-bold mb-3 text-primary-700 tracking-tight drop-shadow-sm text-center">{feature.title}</h3>
                <p className="text-gray-700 text-lg font-medium text-center opacity-90 leading-relaxed">{feature.description}</p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-primary-100 rounded-full opacity-60 group-hover:opacity-90 transition-opacity"></div>
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
          <Button className="bg-primary-600 hover:bg-primary-700 hover:shadow-xl px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg text-white transition-all duration-300 transform hover:scale-105">
            <Link to="/reservations" className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Awards & Reviews Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-8">Our Awards & What People Say</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
            <div className="flex-1 bg-white/80 rounded-xl shadow-lg p-6 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-600 mb-3">Awards</h3>
              <ul className="text-primary-700 space-y-2 text-base">
                <li>🏆 Culinary Excellence Award – 2022</li>
                <li>🥇 Restaurant of the Year – 2023</li>
                <li>🍽️ Best Fine Dining Experience – Foodie Magazine, 2023</li>
              </ul>
            </div>
            <div className="flex-1 bg-white/80 rounded-xl shadow-lg p-6 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-600 mb-3">Customer Reviews</h3>
              <ul className="text-primary-700 space-y-4 text-base">
                <li>“Exceptional ambiance and unforgettable flavors.”<br /><span className="text-primary-400 text-sm">– Gourmet Review</span></li>
                <li>“A must-visit restaurant for food enthusiasts.”<br /><span className="text-primary-400 text-sm">– The Daily Bite</span></li>
              </ul>
            </div>
          </div>
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
                <Button asChild variant="outline" className="border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white transition-all">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/menu" className="block text-gray-300 hover:text-primary-400 transition-colors">Menu</Link>
                <Link to="/reservations" className="block text-gray-300 hover:text-primary-400 transition-colors">Reservations</Link>
                <Link to="/about" className="block text-gray-300 hover:text-primary-400 transition-colors">About Us</Link>
                <Link to="/gallery" className="block text-gray-300 hover:text-primary-400 transition-colors">Gallery</Link>
                <Link to="/faq" className="block text-gray-300 hover:text-primary-400 transition-colors">FAQ</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-primary-400 transition-colors">Contact</Link>
                <Link to="/policies" className="block text-gray-300 hover:text-primary-400 transition-colors">Policies</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Info</h4>
              <div className="space-y-3 text-gray-300">
                <p>1234 Culinary Ave, Suite 100, Washington, DC 20002</p>
                <p className="hover:text-primary-400 transition-colors cursor-pointer">(202) 555-4567</p>
              </div>
              <h4 className="text-lg font-semibold mt-8 mb-4 text-primary-400">Hours</h4>
              <div className="space-y-1 text-gray-300 text-sm">
                <div className="flex justify-between"><span>Monday–Saturday</span><span>5:00 PM – 11:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>5:00 PM – 9:00 PM</span></div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Café Fausse. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-6">
                <Link to="/policies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</Link>
                <Link to="/policies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default Index;