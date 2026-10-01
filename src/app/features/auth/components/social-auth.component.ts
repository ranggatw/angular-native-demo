import { Component, output } from '@angular/core';
import { Pressable, Text, View } from '@ng-native/components';

@Component({
  selector: 'app-social-auth',
  imports: [Pressable, Text, View],
  template: `
    <view class="container">
      <view class="divider-row">
        <view class="line"></view>
        <text class="divider-text">OR CONTINUE WITH</text>
        <view class="line"></view>
      </view>

      <view class="buttons-row">
        <pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
          class="social-button apple-btn"
          (press)="socialSelect.emit('apple')"
        >
          <text class="social-icon"></text>
          <text class="social-text">Apple</text>
        </pressable>

        <pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          class="social-button google-btn"
          (press)="socialSelect.emit('google')"
        >
          <text class="social-icon-g">G</text>
          <text class="social-text">Google</text>
        </pressable>
      </view>
    </view>
  `,
  styles: `
    .container {
      gap: 16px;
      margin-top: 8px;
    }
    .divider-row {
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }
    .line {
      flex: 1;
      height: 1px;
      background-color: #1e293b;
    }
    .divider-text {
      color: #64748b;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .buttons-row {
      flex-direction: row;
      gap: 12px;
    }
    .social-button {
      flex: 1;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 13px;
      border-radius: 12px;
      border-width: 1px;
      border-color: #233048;
      background-color: #151e2e;
    }
    .social-icon {
      color: #ffffff;
      font-size: 18px;
      font-weight: 700;
    }
    .social-icon-g {
      color: #38bdf8;
      font-size: 16px;
      font-weight: 800;
    }
    .social-text {
      color: #f1f5f9;
      font-size: 14px;
      font-weight: 600;
    }
  `,
})
export class SocialAuthComponent {
  readonly socialSelect = output<'apple' | 'google'>();
}
