import { Component, inject, signal } from '@angular/core';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from '@ng-native/components';
import { AuthService } from '../../../core/auth/auth.service.ts';
import { SocialAuthComponent } from '../components/social-auth.component.ts';

@Component({
  selector: 'app-login-page',
  imports: [
    ActivityIndicator,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Switch,
    Text,
    TextInput,
    View,
    SocialAuthComponent,
  ],
  template: `
    <keyboard-avoiding-view [behavior]="'padding'" class="keyboard-wrap">
      <scroll-view
        class="scroll"
        [contentContainerStyle]="{ flexGrow: 1, padding: 24, justifyContent: 'space-between' }"
        keyboardShouldPersistTaps="handled"
      >
        <view class="top-content">
          <!-- Navigation Back Bar -->
          <view class="nav-bar">
            <pressable
              accessibilityRole="button"
              accessibilityLabel="Back to Menu"
              class="back-btn"
              (press)="auth.navigateTo('welcome')"
            >
              <text class="back-btn-arrow">←</text>
              <text class="back-btn-text">Menu</text>
            </pressable>

            <view class="secure-badge">
              <text class="secure-badge-dot">●</text>
              <text class="secure-badge-text">SSL Encrypted</text>
            </view>
          </view>

          <!-- Header / Title -->
          <view class="header-section">
            <text class="title">Welcome Back</text>
            <text class="subtitle">Enter your corporate or personal credentials</text>
          </view>

          <!-- Error Alert Banner -->
          @if (auth.errorMessage(); as err) {
            <view class="alert-banner">
              <view class="alert-content">
                <text class="alert-icon">⚠</text>
                <text class="alert-message">{{ err }}</text>
              </view>
              <pressable
                accessibilityRole="button"
                accessibilityLabel="Dismiss error"
                (press)="auth.clearError()"
                class="alert-close"
              >
                <text class="alert-close-text">✕</text>
              </pressable>
            </view>
          }

          <!-- Form Fields -->
          <view class="form-container">
            <!-- Email Field -->
            <view class="input-group">
              <text class="field-label">EMAIL ADDRESS</text>
              <view class="input-box">
                <text-input
                  class="field-input"
                  [(value)]="email"
                  placeholder="name@company.com"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  [autoCorrect]="false"
                  returnKeyType="next"
                  accessibilityLabel="Email input"
                />
              </view>
            </view>

            <!-- Password Field -->
            <view class="input-group">
              <view class="label-row">
                <text class="field-label">PASSWORD</text>
                <pressable (press)="onForgotPassword()">
                  <text class="forgot-link">Forgot?</text>
                </pressable>
              </view>

              <view class="input-box password-row">
                <text-input
                  class="field-input password-input"
                  [(value)]="password"
                  placeholder="Enter your password"
                  placeholderTextColor="#64748b"
                  [secureTextEntry]="!showPassword()"
                  autoCapitalize="none"
                  [autoCorrect]="false"
                  returnKeyType="done"
                  (submitEditing)="handleLogin()"
                  accessibilityLabel="Password input"
                />
                <pressable
                  accessibilityRole="button"
                  [accessibilityLabel]="showPassword() ? 'Hide password' : 'Show password'"
                  class="toggle-eye-btn"
                  (press)="toggleShowPassword()"
                >
                  <text class="toggle-eye-text">{{ showPassword() ? 'HIDE' : 'SHOW' }}</text>
                </pressable>
              </view>
            </view>

            <!-- Remember Me Row -->
            <view class="options-row">
              <view class="remember-wrap">
                <switch
                  [(checked)]="rememberMe"
                  [trackColor]="{ false: '#334155', true: '#4f46e5' }"
                  thumbColor="#ffffff"
                />
                <text class="remember-label">Remember me on this device</text>
              </view>
            </view>

            <!-- Quick Demo Credentials Filler for Convenience -->
            <pressable
              accessibilityRole="button"
              class="quick-fill-chip"
              (press)="fillDemoCredentials()"
            >
              <text class="quick-fill-text">Auto-fill Demo: user&#64;native.dev / 123456</text>
            </pressable>

            <!-- Submit Button -->
            <pressable
              accessibilityRole="button"
              accessibilityLabel="Sign in button"
              class="submit-button"
              [class.disabled-btn]="auth.isLoading()"
              (press)="handleLogin()"
            >
              @if (auth.isLoading()) {
                <activity-indicator [size]="'small'" color="#ffffff" />
              } @else {
                <text class="submit-button-text">Sign In to Dashboard</text>
              }
            </pressable>

            <!-- Social Authentication SSO -->
            <app-social-auth (socialSelect)="handleSocialAuth($event)" />
          </view>
        </view>

        <!-- Bottom Footer Switch -->
        <view class="footer-wrap">
          <text class="footer-prompt">Don't have an enterprise account? </text>
          <pressable (press)="auth.quickGuestLogin()">
            <text class="footer-action">Continue as Guest</text>
          </pressable>
        </view>
      </scroll-view>
    </keyboard-avoiding-view>
  `,
  styles: `
    :host {
      flex: 1;
    }
    .keyboard-wrap {
      flex: 1;
    }
    .scroll {
      flex: 1;
      background-color: #0b0f19;
    }
    .top-content {
      gap: 20px;
    }
    .nav-bar {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
    }
    .back-btn {
      flex-direction: row;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      background-color: #151e2e;
      border-width: 1px;
      border-color: #233048;
    }
    .back-btn-arrow {
      color: #94a3b8;
      font-size: 15px;
      font-weight: 700;
    }
    .back-btn-text {
      color: #f1f5f9;
      font-size: 13px;
      font-weight: 600;
    }
    .secure-badge {
      flex-direction: row;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 9999px;
      background-color: #064e3b;
    }
    .secure-badge-dot {
      color: #34d399;
      font-size: 9px;
    }
    .secure-badge-text {
      color: #a7f3d0;
      font-size: 11px;
      font-weight: 600;
    }
    .header-section {
      gap: 6px;
      margin-top: 8px;
    }
    .title {
      color: #f8fafc;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .subtitle {
      color: #94a3b8;
      font-size: 14px;
      line-height: 20px;
    }
    .alert-banner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background-color: #3b1822;
      border-width: 1px;
      border-color: #e11d48;
      padding: 12px 14px;
      border-radius: 12px;
    }
    .alert-content {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    .alert-icon {
      color: #fb7185;
      font-size: 16px;
      font-weight: 800;
    }
    .alert-message {
      color: #ffe4e6;
      font-size: 13px;
      font-weight: 500;
      flex: 1;
    }
    .alert-close {
      padding: 4px;
    }
    .alert-close-text {
      color: #fb7185;
      font-size: 14px;
      font-weight: 700;
    }
    .form-container {
      gap: 16px;
    }
    .input-group {
      gap: 8px;
    }
    .label-row {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .field-label {
      color: #94a3b8;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .forgot-link {
      color: #818cf8;
      font-size: 12px;
      font-weight: 600;
    }
    .input-box {
      background-color: #0f172a;
      border-width: 1px;
      border-color: #233048;
      border-radius: 12px;
      padding: 12px 14px;
    }
    .field-input {
      color: #ffffff;
      font-size: 15px;
    }
    .password-row {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
    }
    .password-input {
      flex: 1;
      padding-top: 4px;
      padding-bottom: 4px;
    }
    .toggle-eye-btn {
      padding: 4px 8px;
    }
    .toggle-eye-text {
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .options-row {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 2px;
    }
    .remember-wrap {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }
    .remember-label {
      color: #cbd5e1;
      font-size: 13px;
    }
    .quick-fill-chip {
      background-color: #1e1b4b;
      border-width: 1px;
      border-color: #4338ca;
      padding: 10px 12px;
      border-radius: 10px;
      align-items: center;
    }
    .quick-fill-text {
      color: #a5b4fc;
      font-size: 12px;
      font-weight: 600;
    }
    .submit-button {
      background-color: #4f46e5;
      padding: 16px;
      border-radius: 14px;
      align-items: center;
      justify-content: center;
      margin-top: 6px;
    }
    .disabled-btn {
      opacity: 0.7;
    }
    .submit-button-text {
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .footer-wrap {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px;
      gap: 4px;
    }
    .footer-prompt {
      color: #64748b;
      font-size: 13px;
    }
    .footer-action {
      color: #38bdf8;
      font-size: 13px;
      font-weight: 700;
    }
  `,
})
export class LoginPage {
  protected readonly auth = inject(AuthService);

  readonly email = signal('');
  readonly password = signal('');
  readonly rememberMe = signal(true);
  readonly showPassword = signal(false);

  toggleShowPassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  fillDemoCredentials(): void {
    this.email.set('user@native.dev');
    this.password.set('angular2026');
    this.auth.clearError();
  }

  async handleLogin(): Promise<void> {
    await this.auth.login({
      email: this.email(),
      password: this.password(),
      rememberMe: this.rememberMe(),
    });
  }

  handleSocialAuth(provider: 'apple' | 'google'): void {
    this.auth.login({
      email: provider === 'apple' ? 'apple.user@icloud.com' : 'google.user@gmail.com',
      password: 'social-oauth-token',
      rememberMe: true,
    });
  }

  onForgotPassword(): void {
    this.auth.errorMessage.set('Password reset instructions sent to your email.');
  }
}
