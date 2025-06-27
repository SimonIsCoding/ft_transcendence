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

  // Login with alias support
  public async login(email: string, password: string, alias?: string): Promise<User> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');

    const user: User = { 
      email: data.user.email, 
      token: data.token,
      alias: alias || data.user.email.split('@')[0]
    };
    
    this.saveUser(user);
    return user;
  }

  // Register with optional alias
  public async register(email: string, password: string, alias?: string): Promise<User> {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');

    const user: User = { 
      email: data.user.email, 
      token: data.token,
      alias: alias || data.user.email.split('@')[0]
    };
    
    this.saveUser(user);
    return user;
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