import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const heroBookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  guests: z.number().min(1, "Must have at least 1 guest").max(12, "Maximum 12 guests allowed"),
  location: z.string().optional(),
});

type HeroBookingFormData = z.infer<typeof heroBookingSchema>;

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];

const HeroBookingForm = () => {
  const { toast } = useToast();
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const form = useForm<HeroBookingFormData>({
    resolver: zodResolver(heroBookingSchema),
    defaultValues: {
      guests: 2,
      location: "Washington, DC",
    },
  });

  const onSubmit = (data: HeroBookingFormData) => {
    // Store booking data in sessionStorage and show signup prompt
    sessionStorage.setItem('pendingBooking', JSON.stringify({
      ...data,
      date: data.date.toISOString(),
    }));
    setShowSignupPrompt(true);
  };

  if (showSignupPrompt) {
    return <CustomerSignupForm onBack={() => setShowSignupPrompt(false)} />;
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-14 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500",
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guests Field */}
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500">
                        <div className="flex items-center justify-start w-full">
                          <UsersIcon className="mr-3 h-5 w-5 text-gray-400" />
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
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Field */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue="19:00">
                    <FormControl>
                      <SelectTrigger className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500">
                        <div className="flex items-center justify-start w-full">
                          <ClockIcon className="mr-3 h-5 w-5 text-gray-400" />
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
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Type location..."
                        className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500 pl-12 text-gray-900"
                      />
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <div className="absolute left-12 top-2 text-xs text-gray-400 uppercase tracking-wide">
                        Location
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
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

      <div className="text-center">
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

const CustomerSignupForm = ({ onBack }: { onBack: () => void }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    createAccount: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerData.name || !customerData.email) return;

    setIsSubmitting(true);
    try {
      const pendingBooking = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');
      
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
            newsletter_signup: customerData.createAccount,
          })
          .select('id')
          .single();

        if (createCustomerError) throw createCustomerError;
        customerId = newCustomer.id;
      }

      // Get available table
      const bookingDate = new Date(pendingBooking.date);
      const { data: availableTable, error: tableError } = await supabase
        .rpc('assign_available_table', {
          p_date: format(bookingDate, 'yyyy-MM-dd'),
          p_time: pendingBooking.time,
        });

      if (tableError) throw tableError;

      if (!availableTable) {
        toast({
          title: "No tables available",
          description: "Sorry, no tables are available for the selected date and time.",
          variant: "destructive",
        });
        return;
      }

      // Create reservation
      const { error: reservationError } = await supabase
        .from('reservations')
        .insert({
          customer_id: customerId,
          reservation_date: format(bookingDate, 'yyyy-MM-dd'),
          reservation_time: pendingBooking.time,
          number_of_guests: pendingBooking.guests,
          table_number: availableTable,
        });

      if (reservationError) throw reservationError;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-reservation-email', {
        body: {
          customerName: customerData.name,
          customerEmail: customerData.email,
          reservationDate: format(bookingDate, 'PPPP'),
          reservationTime: pendingBooking.time,
          numberOfGuests: pendingBooking.guests,
          tableNumber: availableTable,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }

      toast({
        title: "Reservation confirmed!",
        description: `Your table for ${pendingBooking.guests} guests has been reserved for ${format(bookingDate, 'PPPP')} at ${pendingBooking.time}. Table number: ${availableTable}`,
      });

      sessionStorage.removeItem('pendingBooking');
      onBack();
      
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Reservation</h3>
        <p className="text-gray-600">Just a few details to secure your table</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={customerData.name}
            onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="h-12"
          />
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={customerData.email}
            onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="h-12"
          />
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={customerData.phone}
            onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
            className="h-12"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="createAccount"
            checked={customerData.createAccount}
            onChange={(e) => setCustomerData(prev => ({ ...prev, createAccount: e.target.checked }))}
            className="rounded border-gray-300"
          />
          <label htmlFor="createAccount" className="text-sm text-gray-600">
            Subscribe to our newsletter for special offers
          </label>
        </div>

        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="flex-1 h-12"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-300"
          >
            {isSubmitting ? "Processing..." : "Confirm Reservation"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroBookingForm;