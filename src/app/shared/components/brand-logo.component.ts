import { Component } from '@angular/core';
import { Text, View } from '@ng-native/components';

@Component({
  selector: 'app-brand-logo',
  imports: [View, Text],
  template: `
    <view class="logo-wrapper">
      <view class="outer-glow">
        <view class="inner-icon">
          <text class="symbol">▲</text>
        </view>
      </view>
      <text class="brand-name">NATIVE<text class="brand-accent">CORE</text></text>
      <text class="brand-tag">ANGULAR FABRIC SUITE</text>
    </view>
  `,
  styles: `
    .logo-wrapper {
      align-items: center;
      gap: 8px;
    }
    .outer-glow {
      width: 72px;
      height: 72px;
      border-radius: 20px;
      background-color: #1e1b4b;
      align-items: center;
      justify-content: center;
      border-width: 1px;
      border-color: #4f46e5;
    }
    .inner-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background-color: #4f46e5;
      align-items: center;
      justify-content: center;
    }
    .symbol {
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
    }
    .brand-name {
      color: #f8fafc;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 2px;
    }
    .brand-accent {
      color: #38bdf8;
    }
    .brand-tag {
      color: #64748b;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1.5px;
    }
  `,
})
export class BrandLogoComponent {}
