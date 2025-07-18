import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";
import { MapPin, Award, Utensils } from "lucide-react";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Split Screen Layout */}
      <div className="flex min-h-screen">
        
        {/* Left Side - Visual/Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent"></div>
            <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"></div>
            <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-primary-600/10 blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center p-16 text-white">
            <div className="max-w-md">
              <h1 className="text-5xl font-light mb-8 leading-tight">
                Book Your
                <span className="block font-bold text-primary-400">Experience</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Reserve a table at Café Fausse and indulge in an unforgettable culinary journey crafted by award-winning chefs.
              </p>
              
              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Award-Winning</h3>
                    <p className="text-gray-400 text-sm">Michelin-starred cuisine</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Exquisite Menu</h3>
                    <p className="text-gray-400 text-sm">Seasonal ingredients, bold flavors</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Prime Location</h3>
                    <p className="text-gray-400 text-sm">Heart of the culinary district</p>
                  </div>
                </div>
              </div>
              
              {/* Quote */}
              <div className="mt-12 pt-8 border-t border-gray-700">
                <blockquote className="text-lg italic text-gray-300">
                  "A dining experience that transcends the ordinary"
                </blockquote>
                <cite className="text-sm text-gray-500 mt-2 block">— Food & Wine Magazine</cite>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            
            {/* Mobile Header (visible only on mobile) */}
            <div className="lg:hidden text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Reserve Your Table
              </h1>
              <p className="text-gray-600">
                Experience exceptional dining at Café Fausse
              </p>
            </div>
            
            {/* Form Container */}
            <div className="bg-white">
              <ReservationForm />
            </div>
            
            {/* Bottom Info */}
            <div className="mt-8 text-center">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <p className="font-medium text-gray-700">Hours</p>
                  <p>5:00 PM - 11:00 PM</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  <p>(202) 555-4567</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Reservations confirmed instantly • 24-hour cancellation policy
                </p>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      
      <Footer />
    </div>
  );
};

export default Reservations;