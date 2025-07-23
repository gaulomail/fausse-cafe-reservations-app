import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useApi } from '@/hooks/useApi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';

export default function CancelReservation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const id = searchParams.get("id") || "";
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<any>(null);
  const [error, setError] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const { cancelReservation, getCustomerByEmail } = useApi();
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
      try {
        // Try local API first
        const customerRes = await getCustomerByEmail(email);
        const customer = customerRes && customerRes.customer;
        if (!customer) {
          setError("Reservation not found for this email.");
          setLoading(false);
          return;
        }
        // Find reservation by id and customer_id
        // Try to fetch from local API (if available)
        let reservationData = null;
        if (customer.reservations && Array.isArray(customer.reservations)) {
          reservationData = customer.reservations.find((r: any) => r.id === id);
        }
        // If not found in customer object, try fetching directly from backend
        if (!reservationData) {
          // Try local API direct fetch
          try {
            const res = await fetch(`/api/reservations/${id}`);
            if (res.ok) {
              reservationData = await res.json();
            }
          } catch {}
        }
        if (!reservationData) {
          // Try Supabase direct fetch
          try {
            const { data: supaRes, error: supaErr } = await supabase
              .from('reservations')
              .select('*')
              .eq('id', id)
              .maybeSingle();
            if (supaRes) reservationData = supaRes;
          } catch {}
        }
        if (!reservationData) {
          // As a fallback, just set a minimal reservation object
          reservationData = { id, reservation_date: '', reservation_time: '', number_of_guests: '', table_number: '', status: '' };
        }
        if (reservationData.status === "cancelled") {
          setError("This reservation has already been cancelled.");
          setLoading(false);
          return;
        }
        setReservation(reservationData);
        setLoading(false);
      } catch (err: any) {
        setError("Reservation not found or error fetching reservation.");
        setLoading(false);
      }
    }
    fetchReservation();
  }, [email, id, getCustomerByEmail]);

  async function handleCancel() {
    setCancelling(true);
    setError("");
    try {
      const result = await cancelReservation(id, email);
      if (result && (result.success || result.message === 'Reservation cancelled successfully')) {
        setCancelled(true);
      } else {
        setError(result && result.error ? result.error : "Failed to cancel reservation. Please try again or contact us.");
      }
    } catch (err: any) {
      setError("Failed to cancel reservation. Please try again or contact us.");
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