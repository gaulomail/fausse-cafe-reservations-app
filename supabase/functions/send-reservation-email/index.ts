import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReservationEmailRequest {
  customerName: string;
  customerEmail: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: number;
  tableNumber: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      reservationDate,
      reservationTime,
      numberOfGuests,
      tableNumber,
    }: ReservationEmailRequest = await req.json();

    console.log("Processing reservation email for:", customerEmail);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Café Fausse <reservations@resend.dev>",
      to: [customerEmail],
      subject: "Reservation Confirmation - Café Fausse",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center; margin-bottom: 30px;">Café Fausse</h1>
          
          <h2 style="color: #333; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
            Reservation Confirmed
          </h2>
          
          <p>Dear ${customerName},</p>
          
          <p>Thank you for choosing Café Fausse! We're delighted to confirm your reservation.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #8B5CF6;">Reservation Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Date:</strong> ${reservationDate}</li>
              <li style="margin: 10px 0;"><strong>Time:</strong> ${reservationTime}</li>
              <li style="margin: 10px 0;"><strong>Party Size:</strong> ${numberOfGuests} ${numberOfGuests === 1 ? 'guest' : 'guests'}</li>
              <li style="margin: 10px 0;"><strong>Table Number:</strong> ${tableNumber}</li>
            </ul>
          </div>
          
          <p>Please arrive on time for your reservation. If you need to modify or cancel your reservation, please contact us at least 24 hours in advance.</p>
          
          <div style="background-color: #8B5CF6; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0;">Contact Information:</h4>
            <p style="margin: 5px 0;">📍 1234 Culinary Ave, Suite 100, Washington, DC 20002</p>
            <p style="margin: 5px 0;">📞 (202) 555-4567</p>
          </div>
          
          <p>We look forward to providing you with an unforgettable dining experience!</p>
          
          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>The Café Fausse Team</strong>
          </p>
        </div>
      `,
    });

    // Send notification email to restaurant
    const restaurantEmailResponse = await resend.emails.send({
      from: "Café Fausse Reservations <reservations@resend.dev>",
      to: ["restaurant@resend.dev"], // Replace with actual restaurant email
      subject: `New Reservation - Table ${tableNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8B5CF6; text-align: center; margin-bottom: 30px;">New Reservation Alert</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #8B5CF6;">Reservation Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Customer:</strong> ${customerName}</li>
              <li style="margin: 10px 0;"><strong>Email:</strong> ${customerEmail}</li>
              <li style="margin: 10px 0;"><strong>Date:</strong> ${reservationDate}</li>
              <li style="margin: 10px 0;"><strong>Time:</strong> ${reservationTime}</li>
              <li style="margin: 10px 0;"><strong>Party Size:</strong> ${numberOfGuests} ${numberOfGuests === 1 ? 'guest' : 'guests'}</li>
              <li style="margin: 10px 0;"><strong>Table Number:</strong> ${tableNumber}</li>
            </ul>
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            This is an automated notification from the Café Fausse reservation system.
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);
    console.log("Restaurant email sent:", restaurantEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        customerEmailId: customerEmailResponse.data?.id,
        restaurantEmailId: restaurantEmailResponse.data?.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-reservation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);