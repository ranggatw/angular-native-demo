import { computed, Injectable, signal } from '@angular/core';
import { LoginCredentials, ScreenType, User } from './auth.models.ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly activeScreen = signal<ScreenType>('welcome');
  readonly currentUser = signal<User | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  navigateTo(screen: ScreenType): void {
    this.errorMessage.set(null);
    this.activeScreen.set(screen);
  }

  clearError(): void {
    this.errorMessage.set(null);
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    this.errorMessage.set(null);

    const email = credentials.email.trim();
    const password = credentials.password;

    if (!email) {
      this.errorMessage.set('Please enter your email address');
      return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      this.errorMessage.set('Please enter a valid email address');
      return false;
    }

    if (!password) {
      this.errorMessage.set('Please enter your password');
      return false;
    }

    if (password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return false;
    }

    this.isLoading.set(true);

    try {
      // Simulate network authentication
      await new Promise((resolve) => setTimeout(resolve, 350));

      // Mock user extraction from email prefix
      const username = email.split('@')[0];
      const displayName = username.charAt(0).toUpperCase() + username.slice(1);
      const initials = (displayName.slice(0, 2) || 'US').toUpperCase();

      this.currentUser.set({
        id: 'usr_' + Date.now().toString(36),
        name: displayName,
        email: email,
        role: 'Mobile Engineer',
        avatarInitials: initials,
      });

      this.activeScreen.set('dashboard');
      return true;
    } catch {
      this.errorMessage.set('Failed to authenticate. Please try again.');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  quickGuestLogin(): void {
    this.errorMessage.set(null);
    this.currentUser.set({
      id: 'guest_01',
      name: 'Guest Explorer',
      email: 'guest@ng-native.dev',
      role: 'Preview Guest',
      avatarInitials: 'GE',
    });
    this.activeScreen.set('dashboard');
  }

  logout(): void {
    this.currentUser.set(null);
    this.errorMessage.set(null);
    this.activeScreen.set('welcome');
  }
}
