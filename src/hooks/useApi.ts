import { supabase, isLocalApi, LOCAL_API_URL } from '@/integrations/supabase/client';

export function useApi() {
  // Auth: Register
  const register = async (email: string, password: string, full_name?: string) => {
    if (isLocalApi()) {
      const res = await fetch(`${LOCAL_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } else {
      return supabase.auth.signUp({ email, password, options: { data: { full_name } } });
    }
  };

  // Auth: Login
  const login = async (email: string, password: string) => {
    if (isLocalApi()) {
      const res = await fetch(`${LOCAL_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } else {
      return supabase.auth.signInWithPassword({ email, password });
    }
  };

  // Auth: Get current user
  const getCurrentUser = async () => {
    if (isLocalApi()) {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`${LOCAL_API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } else {
      return supabase.auth.getUser();
    }
  };

  // Example: get reservations (admin)
  const getReservations = async () => {
    if (isLocalApi()) {
      const res = await fetch(`${LOCAL_API_URL}/reservations`);
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } else {
      const { data, error } = await supabase
        .from('reservations')
        .select('*');
      if (error) throw error;
      return { reservations: data };
    }
  };

  // Get customer by email
  const getCustomerByEmail = async (email: string) => {
    if (isLocalApi()) {
      const res = await fetch(`${LOCAL_API_URL}/customers?email=${encodeURIComponent(email)}`);
      return await res.json();
    } else {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single();
      if (error) throw error;
      return { customer: data };
    }
  };

  // Upsert customer (for newsletter signup)
  const upsertCustomer = async (customer: any) => {
    if (isLocalApi()) {
      const res = await fetch(`${LOCAL_API_URL}/customers/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      return await res.json();
    } else {
      const { data, error } = await supabase
        .from('customers')
        .upsert(customer, { onConflict: 'email' });
      if (error) throw error;
      return { customer: data };
    }
  };

  // Create reservation
  const createReservation = async (reservation: any) => {
    if (isLocalApi()) {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`${LOCAL_API_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(reservation),
      });
      return await res.json();
    } else {
      // Only send fields Supabase expects
      const {
        customer_id,
        reservation_date,
        reservation_time,
        number_of_guests,
        table_number = null,
        // status, etc. as needed
      } = reservation;
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          customer_id,
          reservation_date,
          reservation_time,
          number_of_guests,
          table_number,
          // status, etc. as needed
        })
        .select('*')
        .single();
      if (error) throw error;
      return { reservation: data };
    }
  };

  // Cancel reservation (works for both local and Supabase)
  const cancelReservation = async (reservationId: string, email?: string) => {
    if (isLocalApi()) {
      const res = await fetch(`${LOCAL_API_URL}/reservations/cancel/${reservationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await res.json();
    } else {
      // Supabase: update status to cancelled
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', reservationId);
      if (error) throw error;
      return { success: true };
    }
  };

  // Newsletter signup (upsert customer and subscribe)
  const newsletterSignup = async (email: string, name: string) => {
    if (isLocalApi()) {
      // Upsert customer
      await upsertCustomer({ email, name, newsletter_signup: true });
      // Also subscribe to newsletter_subscribers
      const res = await fetch(`${LOCAL_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      return await res.json();
    } else {
      return upsertCustomer({ email, name, newsletter_signup: true });
    }
  };

  // Add more API methods as needed, e.g. createReservation, getUsers, etc.

  return {
    register,
    login,
    getCurrentUser,
    getReservations,
    getCustomerByEmail,
    upsertCustomer,
    createReservation,
    cancelReservation,
    newsletterSignup,
    // ...other methods
  };
} 