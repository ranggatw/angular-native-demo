export type ScreenType = 'welcome' | 'login' | 'dashboard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  errorMessage: string | null;
  activeScreen: ScreenType;
}
