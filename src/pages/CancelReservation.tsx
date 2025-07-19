import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancelReservation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const id = searchParams.get("id") || "";
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<any>(null);
  const [error, setError] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchReservation() {
      setLoading(true);
      setError("");
      setReservation(null);
      if (!email || !id) {
        setError("Missing reservation information.");
        setLoading(false);
        return;
      }
      // Find customer by email
      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      if (customerError || !customer) {
        setError("Reservation not found for this email.");
        setLoading(false);
        return;
      }
      // Find reservation by id and customer_id
      const { data: reservationData, error: reservationError } = await supabase
        .from("reservations")
        .select("*")
        .eq("customer_id", customer.id)
        .eq("id", id)
        .maybeSingle();
      if (reservationError || !reservationData) {
        setError("Reservation not found.");
        setLoading(false);
        return;
      }
      if (reservationData.status === "cancelled") {
        setError("This reservation has already been cancelled.");
        setLoading(false);
        return;
      }
      setReservation(reservationData);
      setLoading(false);
    }
    fetchReservation();
  }, [email, id]);

  async function handleCancel() {
    setCancelling(true);
    setError("");
    // Update reservation status to cancelled
    const { error: cancelError } = await supabase
      .from("reservations")
      .update({ status: "cancelled" })
      .eq("id", id);
    if (cancelError) {
      setError("Failed to cancel reservation. Please try again or contact us.");
    } else {
      setCancelled(true);
    }
    setCancelling(false);
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full shadow-xl border border-primary-100">
        <CardHeader>
          <CardTitle className="text-primary-700 text-2xl font-bold text-center">
            Cancel Reservation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading reservation...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600 font-medium">{error}</div>
          ) : cancelled ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <div className="text-lg font-semibold text-primary-700 mb-2">Reservation Cancelled</div>
              <div className="text-gray-700 mb-6">Your reservation has been successfully cancelled. We hope to see you another time!</div>
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🗓️</div>
              <div className="text-lg font-semibold text-primary-700 mb-2">Reservation Details</div>
              <div className="mb-4 text-gray-700">
                <div><b>Date:</b> {reservation.reservation_date}</div>
                <div><b>Time:</b> {reservation.reservation_time}</div>
                <div><b>Guests:</b> {reservation.number_of_guests}</div>
                <div><b>Table:</b> {reservation.table_number}</div>
                <div className="mt-2 text-sm text-gray-500">Reservation ID: {reservation.id}</div>
              </div>
              <div className="mb-6 text-gray-600">Are you sure you want to cancel this reservation?</div>
              <Button
                onClick={handleCancel}
                disabled={cancelling}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel Reservation"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 