//I think we don't use this file - check with josegar2
const API_URL = 'https://localhost:4443/api/auth';

interface User {
  email: string;
  token: string;
  alias?: string;
}

class AuthService {
  private static instance: AuthService;
  private listeners: (() => void)[] = [];

  private constructor() {} // Private constructor for singleton

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Get current user
  public getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

public async login(email: string, password: string, alias?: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    
    // Check for unsuccessful response
    if (!response.ok || result.status !== 'success') {
      throw new Error(result.error || result.message || 'Login failed');
    }

    // Verify required fields exist in the response
    if (!result.data?.user?.email || !result.data?.token) {
      throw new Error('Invalid server response format');
    }

    const user: User = {
      email: result.data.user.email,
      token: result.data.token,
      alias: alias || result.data.user.alias || result.data.user.email.split('@')[0]
    };
    
    this.saveUser(user);
    return user;
    
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
}

public async register(email: string, password: string, alias?: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, ...(alias && { alias }) }), // Include alias if provided
    });

    const result = await response.json();
    
    // Check for unsuccessful response
    if (!response.ok || result.status !== 'success') {
      throw new Error(result.error || result.message || 'Registration failed');
    }

    // Verify required fields exist in the response
    if (!result.data?.user?.email || !result.data?.token) {
      throw new Error('Invalid server response format');
    }

    const user: User = {
      email: result.data.user.email,
      token: result.data.token,
      alias: alias || result.data.user.alias || result.data.user.email.split('@')[0]
    };
    
    this.saveUser(user);
    return user;
    
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Registration failed'
    );
  }
}

  public logout(): void {
    localStorage.removeItem('user');
    this.notifyListeners();
  }

  public updateAlias(alias: string): void {
    const user = this.getCurrentUser();
    if (user) {
      user.alias = alias;
      this.saveUser(user);
    }
  }

  // Subscribe to auth changes
  public onAuthStateChanged(callback: () => void): void {
    this.listeners.push(callback);
  }

  // Private methods
  private saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(cb => cb());
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();