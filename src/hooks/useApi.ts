import { apiRequest, LOCAL_API_URL } from '@/lib/api-client';

export function useApi() {
  // Auth: Register
  const register = async (email: string, password: string, full_name?: string) => {
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
  };

  // Auth: Login
  const login = async (email: string, password: string) => {
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
  };

  // Auth: Get current user
  const getCurrentUser = async () => {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${LOCAL_API_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  };

  // Example: get reservations (admin)
  const getReservations = async () => {
    const res = await fetch(`${LOCAL_API_URL}/reservations`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };

  // Get all reservations with customer details (admin)
  const getAllReservationsWithCustomers = async () => {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${LOCAL_API_URL}/admin/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };

  // Update reservation (admin)
  const updateReservation = async (id: string, data: any) => {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${LOCAL_API_URL}/admin/reservations/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };

  // Get reservations for a specific user by email
  const getUserReservations = async (email: string) => {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${LOCAL_API_URL}/reservations/user?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };

  // Get reservation by ID
  const getReservationById = async (id: string) => {
    const res = await fetch(`${LOCAL_API_URL}/reservations/${id}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };

  // Get customer by email
  const getCustomerByEmail = async (email: string) => {
    const res = await fetch(`${LOCAL_API_URL}/customers?email=${encodeURIComponent(email)}`);
    return await res.json();
  };

  // Upsert customer (for newsletter signup)
  const upsertCustomer = async (customer: any) => {
    const res = await fetch(`${LOCAL_API_URL}/customers/upsert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    return await res.json();
  };

  // Create reservation
  const createReservation = async (reservation: any) => {
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
  };

  // Cancel reservation
  const cancelReservation = async (reservationId: string, email?: string) => {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${LOCAL_API_URL}/reservations/cancel/${reservationId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  };

  // Newsletter signup
  const newsletterSignup = async (email: string, name: string) => {
    // Upsert customer
    await upsertCustomer({ email, name, newsletter_signup: true });
    // Also subscribe to newsletter_subscribers
    const res = await fetch(`${LOCAL_API_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });
    return await res.json();
  };

  return {
    register,
    login,
    getCurrentUser,
    getReservations,
    getAllReservationsWithCustomers,
    updateReservation,
    getUserReservations,
    getReservationById,
    getCustomerByEmail,
    upsertCustomer,
    createReservation,
    cancelReservation,
    newsletterSignup,
  };
}