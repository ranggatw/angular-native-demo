import { Component, inject } from '@angular/core';
import { SafeAreaProvider, SafeAreaView } from '@ng-native/components';
import { AuthService } from './core/auth/auth.service.ts';
import { DashboardPage } from './features/dashboard/pages/dashboard.page.ts';
import { LoginPage } from './features/auth/pages/login.page.ts';
import { WelcomePage } from './features/welcome/pages/welcome.page.ts';

@Component({
  selector: 'app-root',
  imports: [
    SafeAreaProvider,
    SafeAreaView,
    WelcomePage,
    LoginPage,
    DashboardPage,
  ],
  template: `
    <safe-area-provider>
      <safe-area-view class="screen">
        @switch (auth.activeScreen()) {
          @case ('welcome') {
            <app-welcome-page />
          }
          @case ('login') {
            <app-login-page />
          }
          @case ('dashboard') {
            <app-dashboard-page />
          }
        }
      </safe-area-view>
    </safe-area-provider>
  `,
  styles: `
    :host {
      flex: 1;
    }
    .screen {
      flex: 1;
      background-color: #0b0f19;
    }
  `,
})
export class App {
  protected readonly auth = inject(AuthService);
}
