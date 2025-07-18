import React from "react";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Phone, Clock } from "lucide-react";

const Reservations = () => {
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
              <Link to="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
                Menu
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-red-600 transition-colors">
                About
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-red-600 transition-colors">
                Gallery
              </Link>
              <Link to="/reservations" className="text-red-600 font-medium">
                Reservations
              </Link>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium">
                <Link to="/reservations">Book Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-red-600" />
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Table Reservations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reserve your table at Café Fausse for an unforgettable dining experience. 
            Choose your preferred date and time to join us.
          </p>
        </div>
      </div>

      {/* Reservation Form Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ReservationForm />
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <Clock className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Restaurant Hours</h3>
              <div className="text-gray-600 space-y-2">
                <p>Monday–Saturday: 5:00 PM – 11:00 PM</p>
                <p>Sunday: 5:00 PM – 9:00 PM</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <Phone className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Contact Us</h3>
              <div className="text-gray-600">
                <p className="mb-2">(202) 555-4567</p>
                <p className="text-sm">For special requests or large parties (12+ guests)</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Booking Policy</h3>
              <div className="text-gray-600 space-y-2">
                <p>Reservations recommended</p>
                <p>24-hour cancellation policy</p>
              </div>
            </div>
          </div>
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

export default Reservations;