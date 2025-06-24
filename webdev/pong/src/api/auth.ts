const API_URL = 'https://localhost:4443/api/auth';

//expected structure from API
export interface AuthResponse {
  status: string;
  data: {
    user: {
      email: string;
    };
    token: string;
  };
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // Parse always

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // Parse always

    if (!response.ok) {
      // Handle all possible error response structures
      throw new Error(
        data.error || 
        data.message || 
        'Registration failed'
      );
    }
    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
