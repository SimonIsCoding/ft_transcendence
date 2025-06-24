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
  console.log("Sending request to:", API_URL); // Verify endpoint
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    console.log("Raw response:", response); // Check HTTP status

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
// Similar for register()
