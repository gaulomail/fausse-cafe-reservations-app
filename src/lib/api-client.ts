import { isLocalApi, LOCAL_API_URL } from '@/integrations/supabase/client';

// Types to match Supabase response structure
export interface ApiResponse<T = any> {
  data: T | null;
  error: Error | null;
}

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      return { data: null, error: new Error(errorJson.message || errorJson.error || 'API Error') };
    } catch {
      return { data: null, error: new Error(errorText || 'API Error') };
    }
  }

  try {
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// Generic API request function
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    // If we're not using the local API, return an error
    if (!isLocalApi()) {
      return { 
        data: null, 
        error: new Error('API client is configured to use Supabase, not local API') 
      };
    }

    // Ensure the endpoint starts with a slash
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Get the JWT token from localStorage if it exists
    const token = localStorage.getItem('jwt');
    
    // Set up headers
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    
    // Add authorization header if token exists
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    // Make the request
    const response = await fetch(`${LOCAL_API_URL}${normalizedEndpoint}`, {
      ...options,
      headers,
    });
    
    return handleResponse<T>(response);
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// Auth API
export const auth = {
  // Sign up with email and password
  signUp: async (credentials: { email: string; password: string; options?: { data?: any } }) => {
    const { email, password, options } = credentials;
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        full_name: options?.data?.full_name || '',
      }),
    });
  },

  // Sign in with email and password
  signInWithPassword: async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      localStorage.setItem('jwt', response.data.token);
    }

    return response;
  },

  // Sign in with OAuth (redirects to provider)
  signInWithOAuth: async ({ provider, options }: { provider: string; options?: any }) => {
    // For OAuth, we'll need to redirect to the backend endpoint that handles OAuth
    const redirectUrl = options?.redirectTo || window.location.origin;
    window.location.href = `${LOCAL_API_URL}/auth/${provider}?redirect_to=${encodeURIComponent(redirectUrl)}`;
    return { data: null, error: null };
  },

  // Get the current session
  getSession: async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return { data: { session: null }, error: null };
    }

    const response = await apiRequest('/auth/user');
    if (response.error) {
      localStorage.removeItem('jwt');
      return { data: { session: null }, error: response.error };
    }

    return {
      data: {
        session: {
          user: response.data,
          access_token: token,
        },
      },
      error: null,
    };
  },

  // Sign out
  signOut: async ({ scope = 'local' }: { scope?: 'local' | 'global' } = {}) => {
    try {
      // Remove JWT token
      localStorage.removeItem('jwt');
      
      // If scope is global, also call the backend to invalidate the token
      if (scope === 'global') {
        await apiRequest('/auth/logout', { method: 'POST' });
      }
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Set up auth state change listener
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // This is a simplified version that doesn't actually listen for changes
    // In a real implementation, you might use WebSockets or polling
    
    // Immediately check the current session
    const checkSession = async () => {
      const { data } = await auth.getSession();
      callback('INITIAL', data.session);
    };
    
    checkSession();
    
    // Return a fake subscription object
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },
};

// Database API
export const db = {
  // Create a query builder for a table
  from: (table: string) => ({
    // Select data from the table
    select: (columns: string = '*') => ({
      // Add a filter
      eq: (column: string, value: any) => ({
        // Execute the query and return a single result
        async single() {
          return apiRequest(`/${table}/single?column=${column}&value=${encodeURIComponent(value)}&select=${columns}`);
        },
        // Execute the query and return multiple results
        async get() {
          return apiRequest(`/${table}?column=${column}&value=${encodeURIComponent(value)}&select=${columns}`);
        },
      }),
      // Execute the query without filters
      async get() {
        return apiRequest(`/${table}?select=${columns}`);
      },
      // Order the results
      order: (column: string, { ascending = true } = {}) => ({
        // Execute the query
        async get() {
          return apiRequest(`/${table}?select=${columns}&order=${column}&ascending=${ascending}`);
        },
      }),
    }),
    // Insert data into the table
    insert: (data: any) => ({
      async execute() {
        return apiRequest(`/${table}`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
      },
    }),
    // Update data in the table
    update: (data: any) => ({
      // Add a filter
      eq: (column: string, value: any) => ({
        // Execute the query
        async execute() {
          return apiRequest(`/${table}/${value}`, {
            method: 'PUT',
            body: JSON.stringify(data),
          });
        },
      }),
    }),
    // Upsert data in the table
    upsert: (data: any, { onConflict }: { onConflict?: string } = {}) => ({
      async execute() {
        return apiRequest(`/${table}/upsert`, {
          method: 'POST',
          body: JSON.stringify({ data, onConflict }),
        });
      },
    }),
  }),
};

// Export the LOCAL_API_URL for use in other files
export { LOCAL_API_URL };

// Create a client object that mimics the Supabase client
export const apiClient = {
  auth,
  from: db.from,
};

export default apiClient;