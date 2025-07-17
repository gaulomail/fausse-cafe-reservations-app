import React from "react";
import ReservationForm from "@/components/ReservationForm";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Table Reservations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reserve your table at Café Fausse for an unforgettable dining experience. 
            Choose your preferred date and time for 2025.
          </p>
        </div>
        
        <div className="flex justify-center">
          <ReservationForm />
        </div>
        
        <div className="mt-12 text-center text-muted-foreground">
          <p className="mb-2">
            <strong>Restaurant Hours:</strong>
          </p>
          <p>Monday–Saturday: 5:00 PM – 11:00 PM</p>
          <p>Sunday: 5:00 PM – 9:00 PM</p>
          <p className="mt-4">
            For special requests or large parties (12+ guests), please call us at{" "}
            <span className="font-semibold">(202) 555-4567</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservations;