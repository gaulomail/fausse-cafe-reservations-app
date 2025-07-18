import React from "react";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Phone, Clock, MapPin, Users, CheckCircle, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import restaurantHero from "@/assets/restaurant-hero.jpg";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section - Enhanced with background image */}
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600/20 backdrop-blur-sm rounded-full mb-6 border border-primary-400/30">
              <Calendar className="w-10 h-10 text-primary-300" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Reserve Your Table
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/95 font-light max-w-3xl mx-auto drop-shadow-md">
              Book your unforgettable dining experience at Café Fausse. Choose your perfect moment with us.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Reservation Form Column */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary-700 mb-4">Book Your Experience</h2>
                <p className="text-gray-600">Fill out the form below and we'll confirm your reservation via email</p>
              </div>
              <ReservationForm />
            </div>

            {/* Information Column */}
            <div className="space-y-8">
              {/* Restaurant Features */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-primary-600" />
                  Why Choose Café Fausse?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, title: "Award-Winning Cuisine", desc: "Multiple culinary awards for excellence" },
                    { icon: Users, title: "Expert Service", desc: "Professional staff for memorable evenings" },
                    { icon: MapPin, title: "Prime Location", desc: "Heart of the culinary district" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurant Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
                  <Clock className="w-8 h-8 mb-4 text-primary-600" />
                  <h3 className="text-lg font-semibold mb-3 text-primary-800">Operating Hours</h3>
                  <div className="text-primary-700 space-y-1 text-sm">
                    <p><strong>Monday–Saturday:</strong> 5:00 PM – 11:00 PM</p>
                    <p><strong>Sunday:</strong> 5:00 PM – 9:00 PM</p>
                    <p className="text-xs mt-2 text-primary-600">Kitchen closes 30 minutes before closing</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
                  <Phone className="w-8 h-8 mb-4 text-primary-600" />
                  <h3 className="text-lg font-semibold mb-3 text-primary-800">Contact & Support</h3>
                  <div className="text-primary-700 space-y-1 text-sm">
                    <p className="font-medium">(202) 555-4567</p>
                    <p>For special requests</p>
                    <p>Large parties (12+ guests)</p>
                    <p className="text-xs mt-2 text-primary-600">Available during business hours</p>
                  </div>
                </div>
              </div>

              {/* Booking Policy */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-primary-600" />
                  Reservation Policies
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Booking Guidelines</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Advance booking recommended</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Up to 12 guests per reservation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Email confirmation sent instantly</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Cancellation Policy</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span>24-hour advance notice required</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Phone className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span>Call us for any modifications</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span>Large parties: Special arrangements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Questions About Your Reservation?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Our team is here to help make your dining experience perfect. Don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="tel:(202)555-4567">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              <Link to="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Reservations;