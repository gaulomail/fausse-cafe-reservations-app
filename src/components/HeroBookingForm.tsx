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

const heroBookingSchema = z.object({
  date: z.date({
    required_error: "Please select a reservation date",
  }),
  time: z.string({
    required_error: "Please select a time slot",
  }),
  guests: z.number().min(1, "Must have at least 1 guest").max(12, "Maximum 12 guests allowed"),
});

const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  newsletterSignup: z.boolean().default(false),
});

type HeroBookingFormData = z.infer<typeof heroBookingSchema>;
type CustomerFormData = z.infer<typeof customerSchema>;

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];

const HeroBookingForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [bookingData, setBookingData] = useState<HeroBookingFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          description: "Sorry, no tables are available for the selected date and time. Please choose a different time slot.",
          variant: "destructive",
        });
        return;
      }

      // Create reservation
      const { error: reservationError } = await supabase
        .from('reservations')
        .insert({
          customer_id: customerId,
          reservation_date: format(bookingData.date, 'yyyy-MM-dd'),
          reservation_time: bookingData.time,
          number_of_guests: bookingData.guests,
          table_number: availableTable,
        });

      if (reservationError) throw reservationError;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-reservation-email', {
        body: {
          customerName: customerData.name,
          customerEmail: customerData.email,
          reservationDate: format(bookingData.date, 'PPPP'),
          reservationTime: bookingData.time,
          numberOfGuests: bookingData.guests,
          tableNumber: availableTable,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
      }

      toast({
        title: "Reservation confirmed!",
        description: `Your table for ${bookingData.guests} guests has been reserved for ${format(bookingData.date, 'PPPP')} at ${bookingData.time}. Table number: ${availableTable}`,
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
                      <SelectTrigger className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500">
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
                      {timeSlots.map((time) => (
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
                      <SelectTrigger className="w-full h-14 bg-white border-gray-300 hover:bg-gray-50 focus:border-primary-500 focus:ring-primary-500">
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
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
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
                    className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg"
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
                    className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg"
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
                    className="h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg"
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