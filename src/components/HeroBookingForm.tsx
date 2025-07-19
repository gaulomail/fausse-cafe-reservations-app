import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const heroBookingSchema = z.object({
  date: z.date({
    required_error: "Please select a reservation date",
  }),
  time: z.string({
    required_error: "Please select a time slot",
  }),
  guests: z.number().min(1, "Must have at least 1 guest").max(8, "Maximum 8 guests allowed"),
});

const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  newsletterSignup: z.boolean().default(false),
});

type HeroBookingFormData = z.infer<typeof heroBookingSchema>;
type CustomerFormData = z.infer<typeof customerSchema>;

const allTimeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];

function getTimeSlotsForDate(date: Date | undefined) {
  if (!date) return allTimeSlots;
  const day = date.getDay(); // 0 = Sunday
  if (day === 0) {
    // Sunday: 5:00 PM – 9:00 PM
    return allTimeSlots.filter(t => t >= "17:00" && t <= "21:00");
  }
  // Mon-Sat: 5:00 PM – 11:00 PM
  return allTimeSlots;
}

export async function handleDownloadPDF(reservationDetails: any, supabase: any) {
  const doc = new jsPDF();
  // Use site primary red: #dd524c (RGB 221,82,76)
  doc.setFont('times', 'normal');
  doc.setFontSize(22);
  doc.setTextColor(221, 82, 76); // Title
  doc.text('Café Fausse', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text('An Exceptional Dining Experience', 105, 28, { align: 'center' });
  doc.setDrawColor(221, 82, 76); // Line color
  doc.line(20, 32, 190, 32);
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(221, 82, 76); // Red background
  doc.rect(20, 38, 170, 14, 'F');
  doc.text('RESERVATION RECEIPT', 105, 48, { align: 'center' });
  if (reservationDetails.reservationId) {
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(221, 82, 76);
    doc.rect(20, 56, 170, 10, 'F');
    doc.text(`Confirmation Number: ${String(reservationDetails.reservationId).substring(0, 8).toUpperCase()}`, 105, 63, { align: 'center' });
  }
  doc.setFontSize(14);
  doc.setTextColor(221, 82, 76); // Label color
  doc.text('Guest Name:', 30, 80);
  doc.setTextColor(51, 51, 51);
  doc.text(reservationDetails.customerName, 80, 80);
  doc.setTextColor(221, 82, 76);
  doc.text('Email:', 30, 90);
  doc.setTextColor(51, 51, 51);
  doc.text(reservationDetails.customerEmail, 80, 90);
  doc.setTextColor(221, 82, 76);
  doc.text('Date:', 30, 100);
  doc.setTextColor(51, 51, 51);
  doc.text(reservationDetails.reservationDate, 80, 100);
  doc.setTextColor(221, 82, 76);
  doc.text('Time:', 30, 110);
  doc.setTextColor(51, 51, 51);
  doc.text(reservationDetails.reservationTime, 80, 110);
  doc.setTextColor(221, 82, 76);
  doc.text('Party Size:', 30, 120);
  doc.setTextColor(51, 51, 51);
  doc.text(`${reservationDetails.numberOfGuests} ${reservationDetails.numberOfGuests === 1 ? 'Guest' : 'Guests'}`, 80, 120);
  doc.setTextColor(221, 82, 76);
  doc.text('Table Number:', 30, 130);
  doc.setTextColor(51, 51, 51);
  doc.text(`Table ${reservationDetails.tableNumber}`, 80, 130);
  doc.setFontSize(12);
  doc.setTextColor(221, 82, 76);
  doc.text('Restaurant Information', 30, 150);
  doc.setTextColor(51, 51, 51);
  doc.text('123 Culinary District, Fine Dining Ave', 30, 158);
  doc.text('(202) 555-4567', 30, 166);
  doc.text('Tuesday - Sunday, 5:00 PM - 11:00 PM', 30, 174);
  doc.text('Dress Code: Smart Casual', 30, 182);
  doc.setTextColor(221, 82, 76);
  doc.text('Important Notes', 30, 200);
  doc.setTextColor(51, 51, 51);
  doc.text('- Please arrive 15 minutes before your reservation time', 30, 208);
  doc.text('- Cancellations must be made 24 hours in advance', 30, 216);
  doc.text('- For parties of 8 or more, a 20% gratuity will be added', 30, 224);
  doc.text('- We accommodate dietary restrictions with advance notice', 30, 232);
  doc.setFontSize(10);
  doc.setTextColor(102, 102, 102);
  doc.text(`Receipt generated on ${new Date().toLocaleDateString()}`, 30, 250);
  doc.text('We look forward to welcoming you to Café Fausse!', 30, 256);
  doc.text('"Where every meal is a masterpiece"', 30, 262);

  // --- Add links section ---
  const email = reservationDetails.customerEmail;
  const reservationId = reservationDetails.reservationId;
  const cancelUrl = `${window.location.origin}/cancel-reservation?email=${encodeURIComponent(email)}&id=${encodeURIComponent(reservationId)}`;

  // Check if user exists in 'profiles' table
  let hasAccount = false;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    hasAccount = !!(data && data.id);
  } catch (e) {
    hasAccount = false;
  }

  let authUrl, authText;
  if (hasAccount) {
    authUrl = `${window.location.origin}/auth?login=1&email=${encodeURIComponent(email)}`;
    authText = 'Log in to your account';
  } else {
    authUrl = `${window.location.origin}/auth?signup=1&email=${encodeURIComponent(email)}`;
    authText = 'Sign up for an account';
  }

  let y = 270;
  doc.setFontSize(12);
  doc.setTextColor(221, 82, 76);
  doc.textWithLink('Cancel your reservation', 30, y, { url: cancelUrl });
  y += 8;
  doc.textWithLink(authText, 30, y, { url: authUrl });

  doc.save('reservation_receipt.pdf');
}

const HeroBookingForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [bookingData, setBookingData] = useState<HeroBookingFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<any | null>(null); // Add after other useState
  const [pdfLoading, setPdfLoading] = useState(false);

  const bookingForm = useForm<HeroBookingFormData>({
    resolver: zodResolver(heroBookingSchema),
    defaultValues: {
      guests: 2,
    },
  });

  const onBookingSubmit = (data: HeroBookingFormData) => {
    setBookingData(data);
    setShowCustomerForm(true);
  };

  const onCustomerSubmit = async (customerData: CustomerFormData) => {
    if (!bookingData) return;
    
    setIsSubmitting(true);
    try {
      // Create or get customer
      const { data: existingCustomer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('email', customerData.email)
        .maybeSingle();

      let customerId;

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: createCustomerError } = await supabase
          .from('customers')
          .insert({
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone || null,
            newsletter_signup: customerData.newsletterSignup,
          })
          .select('id')
          .single();

        if (createCustomerError) throw createCustomerError;
        customerId = newCustomer.id;
      }

      // Check table availability before proceeding
      const { data: availabilityCheck, error: availabilityError } = await supabase
        .rpc('check_booking_availability', {
          p_date: format(bookingData.date, 'yyyy-MM-dd'),
          p_time: bookingData.time,
        });

      if (availabilityError) throw availabilityError;

      const availability = availabilityCheck as any;
      if (!availability?.available) {
        toast({
          title: "Fully booked",
          description: availability?.message || "No tables available for this time",
          variant: "destructive",
        });
        return;
      }

      // Get available table for the selected date and time
      const { data: availableTable, error: tableError } = await supabase
        .rpc('assign_available_table', {
          p_date: format(bookingData.date, 'yyyy-MM-dd'),
          p_time: bookingData.time,
        });

      if (tableError) throw tableError;

      if (!availableTable) {
        toast({
          title: "No tables available",
          description: "Sorry, this time slot just got fully booked. Please choose a different time.",
          variant: "destructive",
        });
        return;
      }

      // Create reservation with optional user link
      const reservationData: any = {
        customer_id: customerId,
        reservation_date: format(bookingData.date, 'yyyy-MM-dd'),
        reservation_time: bookingData.time,
        number_of_guests: bookingData.guests,
        table_number: availableTable,
      };

      // If user is authenticated, link the reservation to them
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email === customerData.email) {
        reservationData.user_id = user.id;
      }

      const { data: inserted, error: reservationError } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select('id')
        .single();
      if (reservationError) throw reservationError;
      const reservationId = inserted.id;

      // Send receipt email (replaces the old confirmation email)
      const { error: receiptError } = await supabase.functions.invoke('send-receipt', {
        body: {
          customerName: customerData.name,
          customerEmail: customerData.email,
          reservationDate: format(bookingData.date, 'PPPP'),
          reservationTime: bookingData.time,
          numberOfGuests: bookingData.guests,
          tableNumber: availableTable,
          reservationId, // Use the real reservation id
        },
      });

      if (receiptError) {
        console.error('Receipt error:', receiptError);
      }

      // Get updated availability after booking
      const { data: updatedAvailability } = await supabase
        .rpc('check_booking_availability', {
          p_date: format(bookingData.date, 'yyyy-MM-dd'),
          p_time: bookingData.time,
        });

      const remainingInfo = updatedAvailability as any;
      toast({
        title: "Reservation confirmed!",
        description: `Your table for ${bookingData.guests} guests has been reserved for ${format(bookingData.date, 'PPPP')} at ${bookingData.time}. Table number: ${availableTable}. ${remainingInfo?.message || ''}`,
      });

      setReservationDetails({
        customerName: customerData.name,
        customerEmail: customerData.email,
        reservationDate: format(bookingData.date, 'PPPP'),
        reservationTime: bookingData.time,
        numberOfGuests: bookingData.guests,
        tableNumber: availableTable,
        reservationId, // Use the real reservation id
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Reset forms
      bookingForm.reset();
      setShowCustomerForm(false);
      setBookingData(null);
    } catch (error) {
      console.error('Reservation error:', error);
      toast({
        title: "Reservation failed",
        description: "There was an error processing your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showCustomerForm) {
    return <CustomerDetailsForm 
      onSubmit={onCustomerSubmit} 
      onBack={() => setShowCustomerForm(false)}
      isSubmitting={isSubmitting}
      bookingData={bookingData}
    />;
  }

  if (reservationDetails) {
    return (
      <div className="w-full text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <CalendarIcon className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-primary-700 mb-2">Reservation Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your table for {reservationDetails.numberOfGuests} guest{reservationDetails.numberOfGuests === 1 ? '' : 's'} has been reserved for {reservationDetails.reservationDate} at {reservationDetails.reservationTime}.<br />
          Table number: {reservationDetails.tableNumber}.
        </p>
        <Button onClick={async () => { setPdfLoading(true); await handleDownloadPDF(reservationDetails, supabase); setPdfLoading(false); }} disabled={pdfLoading} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300">
          {pdfLoading ? 'Generating PDF...' : 'Download Reservation PDF'}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Form {...bookingForm}>
        <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
          {/* Horizontal Strip Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Field */}
            <FormField
              control={bookingForm.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-14 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500 text-gray-900",
                            !field.value && "text-gray-500"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                          <div className="text-left">
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Date</div>
                            <div className="text-sm font-medium text-gray-900">
                              {field.value ? format(field.value, "MMM d") : "Today"}
                            </div>
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          document.body.click();
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || date.getFullYear() !== 2025;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Time Field */}
            <FormField
              control={bookingForm.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue="19:00">
                    <FormControl>
                      <SelectTrigger className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500 text-gray-900">
                        <div className="flex items-center justify-start w-full">
                          <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                          <div className="text-left">
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Time</div>
                            <div className="text-sm font-medium text-gray-900">
                              {field.value || "19:00"}
                            </div>
                          </div>
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getTimeSlotsForDate(bookingForm.watch('date')).map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Guests Field */}
            <FormField
              control={bookingForm.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500 text-gray-900">
                        <div className="flex items-center justify-start w-full">
                          <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                          <div className="text-left">
                            <div className="text-xs text-gray-400 uppercase tracking-wide">Guests</div>
                            <div className="text-sm font-medium text-gray-900">
                              {field.value} {field.value === 1 ? 'person' : 'people'}
                            </div>
                          </div>
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()} className="text-gray-900">
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book Now
          </Button>
        </form>
      </Form>

      <div className="text-center mt-6">
        <p className="text-gray-800 text-sm font-medium">
          Already have a reservation?{" "}
          <Link to="/reservations" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors underline">
            Check your booking
          </Link>
        </p>
      </div>
    </div>
  );
};

const CustomerDetailsForm = ({ 
  onSubmit, 
  onBack, 
  isSubmitting, 
  bookingData 
}: { 
  onSubmit: (data: CustomerFormData) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
  bookingData: HeroBookingFormData | null;
}) => {
  const customerForm = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      newsletterSignup: false,
    },
  });

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <CalendarIcon className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-primary-700 mb-2">Complete Your Reservation</h2>
        {bookingData && (
          <p className="text-gray-600">
            {format(bookingData.date, 'PPPP')} at {bookingData.time} for {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
          </p>
        )}
      </div>
      
      <Form {...customerForm}>
        <form onSubmit={customerForm.handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* Name Field */}
          <FormField
            control={customerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={customerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Email Address *</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    {...field} 
                    className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={customerForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    {...field} 
                    className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg text-gray-900"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {/* Newsletter Signup */}
          <FormField
            control={customerForm.control}
            name="newsletterSignup"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-primary-400 text-primary-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium text-primary-700 cursor-pointer">
                    Subscribe to our newsletter for special offers and exclusive updates
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex-1 h-12 border-primary-300 text-primary-600 hover:bg-primary-50"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HeroBookingForm;