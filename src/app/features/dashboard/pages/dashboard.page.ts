import { Component, inject } from '@angular/core';
import { Pressable, ScrollView, Text, View } from '@ng-native/components';
import { AuthService } from '../../../core/auth/auth.service.ts';

@Component({
  selector: 'app-dashboard-page',
  imports: [Pressable, ScrollView, Text, View],
  template: `
    <scroll-view
      class="scroll"
      [contentContainerStyle]="{ flexGrow: 1, padding: 24, gap: 20 }"
      keyboardShouldPersistTaps="handled"
    >
      <!-- Header with User Profile -->
      <view class="profile-header">
        <view class="user-info-row">
          <view class="avatar-badge">
            <text class="avatar-text">{{ auth.currentUser()?.avatarInitials ?? 'US' }}</text>
            <view class="online-indicator"></view>
          </view>
          <view class="name-block">
            <text class="user-greeting">Welcome back,</text>
            <text class="user-name">{{ auth.currentUser()?.name ?? 'Authenticated User' }}</text>
            <text class="user-email">{{ auth.currentUser()?.email ?? '' }}</text>
          </view>
        </view>

        <view class="role-badge">
          <text class="role-text">{{ auth.currentUser()?.role ?? 'Member' }}</text>
        </view>
      </view>

      <!-- Status Card -->
      <view class="status-card">
        <view class="status-row">
          <text class="status-title">Runtime Environment</text>
          <view class="live-pill">
            <text class="live-dot">●</text>
            <text class="live-text">ONLINE</text>
          </view>
        </view>
        <view class="stats-grid">
          <view class="stat-item">
            <text class="stat-label">RENDERER</text>
            <text class="stat-val">React Native Fabric</text>
          </view>
          <view class="stat-item">
            <text class="stat-label">FRAMEWORK</text>
            <text class="stat-val">Angular 22 Zoneless</text>
          </view>
        </view>
      </view>

      <!-- Menu Section -->
      <view class="menu-section">
        <text class="section-title">QUICK ACCESS MENU</text>

        <view class="menu-list">
          <pressable class="menu-item" accessibilityRole="button">
            <view class="menu-left">
              <view class="menu-icon-box">
                <text class="menu-icon">👤</text>
              </view>
              <view class="menu-labels">
                <text class="menu-label">Personal Profile</text>
                <text class="menu-sublabel">Manage credentials & biometrics</text>
              </view>
            </view>
            <text class="menu-chevron">›</text>
          </pressable>

          <pressable class="menu-item" accessibilityRole="button">
            <view class="menu-left">
              <view class="menu-icon-box">
                <text class="menu-icon">🛡️</text>
              </view>
              <view class="menu-labels">
                <text class="menu-label">Security & MFA</text>
                <text class="menu-sublabel">Two-factor authenticator active</text>
              </view>
            </view>
            <text class="menu-chevron">›</text>
          </pressable>

          <pressable class="menu-item" accessibilityRole="button">
            <view class="menu-left">
              <view class="menu-icon-box">
                <text class="menu-icon">⚙️</text>
              </view>
              <view class="menu-labels">
                <text class="menu-label">Preferences</text>
                <text class="menu-sublabel">Dark theme, notifications</text>
              </view>
            </view>
            <text class="menu-chevron">›</text>
          </pressable>
        </view>
      </view>

      <!-- Sign Out / Logout Action -->
      <view class="signout-section">
        <pressable
          accessibilityRole="button"
          accessibilityLabel="Sign out button"
          class="signout-button"
          (press)="auth.logout()"
        >
          <text class="signout-text">Sign Out of Account</text>
        </pressable>
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
    .profile-header {
      background-color: #151e2e;
      border-width: 1px;
      border-color: #233048;
      border-radius: 16px;
      padding: 18px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }
    .user-info-row {
      flex-direction: row;
      align-items: center;
      gap: 14px;
      flex: 1;
    }
    .avatar-badge {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background-color: #4f46e5;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .avatar-text {
      color: #ffffff;
      font-size: 18px;
      font-weight: 800;
    }
    .online-indicator {
      width: 12px;
      height: 12px;
      border-radius: 6px;
      background-color: #10b981;
      border-width: 2px;
      border-color: #151e2e;
      position: absolute;
      bottom: -2px;
      right: -2px;
    }
    .name-block {
      gap: 2px;
      flex: 1;
    }
    .user-greeting {
      color: #94a3b8;
      font-size: 12px;
    }
    .user-name {
      color: #f8fafc;
      font-size: 17px;
      font-weight: 700;
    }
    .user-email {
      color: #64748b;
      font-size: 12px;
    }
    .role-badge {
      background-color: #1e1b4b;
      border-width: 1px;
      border-color: #4338ca;
      padding: 5px 10px;
      border-radius: 8px;
    }
    .role-text {
      color: #a5b4fc;
      font-size: 11px;
      font-weight: 700;
    }
    .status-card {
      background-color: #151e2e;
      border-width: 1px;
      border-color: #233048;
      border-radius: 16px;
      padding: 16px;
      gap: 14px;
    }
    .status-row {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .status-title {
      color: #f8fafc;
      font-size: 14px;
      font-weight: 700;
    }
    .live-pill {
      flex-direction: row;
      align-items: center;
      gap: 5px;
      background-color: #064e3b;
      padding: 3px 8px;
      border-radius: 9999px;
    }
    .live-dot {
      color: #34d399;
      font-size: 8px;
    }
    .live-text {
      color: #a7f3d0;
      font-size: 10px;
      font-weight: 700;
    }
    .stats-grid {
      flex-direction: row;
      gap: 12px;
    }
    .stat-item {
      flex: 1;
      background-color: #0f172a;
      border-radius: 10px;
      padding: 10px 12px;
      gap: 4px;
    }
    .stat-label {
      color: #64748b;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .stat-val {
      color: #38bdf8;
      font-size: 12px;
      font-weight: 600;
    }
    .menu-section {
      gap: 10px;
    }
    .section-title {
      color: #94a3b8;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      padding-left: 4px;
      padding-right: 4px;
    }
    .menu-list {
      background-color: #151e2e;
      border-width: 1px;
      border-color: #233048;
      border-radius: 16px;
      overflow: hidden;
    }
    .menu-item {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      border-bottom-width: 1px;
      border-bottom-color: #1e293b;
    }
    .menu-left {
      flex-direction: row;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    .menu-icon-box {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background-color: #0f172a;
      align-items: center;
      justify-content: center;
    }
    .menu-icon {
      font-size: 16px;
    }
    .menu-labels {
      gap: 2px;
      flex: 1;
    }
    .menu-label {
      color: #f1f5f9;
      font-size: 14px;
      font-weight: 600;
    }
    .menu-sublabel {
      color: #64748b;
      font-size: 12px;
    }
    .menu-chevron {
      color: #64748b;
      font-size: 20px;
      font-weight: 600;
    }
    .signout-section {
      margin-top: 12px;
      margin-bottom: 24px;
    }
    .signout-button {
      background-color: #3b1822;
      border-width: 1px;
      border-color: #9f1239;
      padding: 15px;
      border-radius: 14px;
      align-items: center;
      justify-content: center;
    }
    .signout-text {
      color: #fda4af;
      font-size: 15px;
      font-weight: 700;
    }
  `,
})
export class DashboardPage {
  protected readonly auth = inject(AuthService);
}
