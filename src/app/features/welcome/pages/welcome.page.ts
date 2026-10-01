import { Component, inject } from '@angular/core';
import { Pressable, ScrollView, Text, View } from '@ng-native/components';
import { AuthService } from '../../../core/auth/auth.service.ts';
import { BrandLogoComponent } from '../../../shared/components/brand-logo.component.ts';

@Component({
  selector: 'app-welcome-page',
  imports: [Pressable, ScrollView, Text, View, BrandLogoComponent],
  template: `
    <scroll-view
      class="scroll"
      [contentContainerStyle]="{ flexGrow: 1, padding: 24, justifyContent: 'space-between' }"
      keyboardShouldPersistTaps="handled"
    >
      <!-- Top Brand Section -->
      <view class="hero-section">
        <app-brand-logo />

        <view class="hero-text-block">
          <text class="hero-title">Experience Pure Native Performance</text>
          <text class="hero-subtitle">
            Angular components compiled directly to React Native Fabric views. Zoneless, reactive signals with zero DOM overhead.
          </text>
        </view>

        <!-- Feature Chips -->
        <view class="chips-container">
          <view class="chip">
            <text class="chip-text">⚡ Direct Fabric Bridge</text>
          </view>
          <view class="chip">
            <text class="chip-text">🛡️ Signal-Driven State</text>
          </view>
          <view class="chip">
            <text class="chip-text">✨ 60fps Native Thread</text>
          </view>
        </view>
      </view>

      <!-- Action / Menu Buttons -->
      <view class="actions-section">
        <pressable
          accessibilityRole="button"
          class="btn-primary"
          (press)="auth.navigateTo('login')"
        >
          <text class="btn-primary-text">Sign In to Workspace</text>
        </pressable>

        <pressable
          accessibilityRole="button"
          class="btn-secondary"
          (press)="auth.quickGuestLogin()"
        >
          <text class="btn-secondary-text">Explore as Guest</text>
        </pressable>

        <view class="footer-note">
          <text class="footer-text">Protected by enterprise biometric & multi-factor security</text>
        </view>
      </view>
    </scroll-view>
  `,
  styles: `
    :host {
      flex: 1;
    }
    .scroll {
      flex: 1;
      background-color: #0b0f19;
    }
    .hero-section {
      align-items: center;
      padding-top: 36px;
      gap: 24px;
    }
    .hero-text-block {
      align-items: center;
      gap: 12px;
      padding-left: 8px;
      padding-right: 8px;
    }
    .hero-title {
      color: #f8fafc;
      font-size: 26px;
      font-weight: 800;
      text-align: center;
      line-height: 34px;
    }
    .hero-subtitle {
      color: #94a3b8;
      font-size: 15px;
      text-align: center;
      line-height: 22px;
    }
    .chips-container {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 8px;
    }
    .chip {
      background-color: #151e2e;
      border-width: 1px;
      border-color: #233048;
      padding: 6px 12px;
      border-radius: 9999px;
    }
    .chip-text {
      color: #38bdf8;
      font-size: 12px;
      font-weight: 600;
    }
    .actions-section {
      gap: 12px;
      padding-bottom: 20px;
    }
    .btn-primary {
      background-color: #4f46e5;
      padding: 16px;
      border-radius: 14px;
      align-items: center;
      justify-content: center;
    }
    .btn-primary-text {
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .btn-secondary {
      background-color: #151e2e;
      border-width: 1px;
      border-color: #233048;
      padding: 15px;
      border-radius: 14px;
      align-items: center;
      justify-content: center;
    }
    .btn-secondary-text {
      color: #f1f5f9;
      font-size: 15px;
      font-weight: 600;
    }
    .footer-note {
      align-items: center;
      margin-top: 6px;
    }
    .footer-text {
      color: #475569;
      font-size: 12px;
      text-align: center;
    }
  `,
})
export class WelcomePage {
  protected readonly auth = inject(AuthService);
}
