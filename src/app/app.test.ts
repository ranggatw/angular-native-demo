import { render, screen, userEvent } from '@ng-native/testing';
import { describe, expect, it } from 'vitest';
import { App } from './app.ts';

describe('App Authentication Flow', () => {
  it('renders welcome screen initially with menu actions', async () => {
    await render(App);

    expect(screen.getByText('Experience Pure Native Performance')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sign In to Workspace' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explore as Guest' })).toBeTruthy();
  });

  it('navigates to login screen when clicking Sign In to Workspace', async () => {
    await render(App);

    await userEvent.setup().press(screen.getByRole('button', { name: 'Sign In to Workspace' }));

    expect(screen.getByText('Welcome Back')).toBeTruthy();
    expect(screen.getByLabelText('Email input')).toBeTruthy();
    expect(screen.getByLabelText('Password input')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sign in button' })).toBeTruthy();
  });

  it('allows logging in with demo credentials and transitioning to dashboard', async () => {
    await render(App);
    const user = userEvent.setup();

    // Navigate to Login
    await user.press(screen.getByRole('button', { name: 'Sign In to Workspace' }));

    // Tap quick fill demo credentials
    await user.press(screen.getByRole('button', { name: /Auto-fill Demo/ }));

    // Tap Sign In
    await user.press(screen.getByRole('button', { name: 'Sign in button' }));

    // Verify dashboard rendered
    expect(await screen.findByText('Welcome back,')).toBeTruthy();
    expect(screen.getByText('Sign Out of Account')).toBeTruthy();

    // Sign out back to Welcome
    await user.press(screen.getByRole('button', { name: 'Sign out button' }));
    expect(screen.getByText('Experience Pure Native Performance')).toBeTruthy();
  });

  it('allows one-click explore as guest', async () => {
    await render(App);
    const user = userEvent.setup();

    await user.press(screen.getByRole('button', { name: 'Explore as Guest' }));

    expect(screen.getByText('Guest Explorer')).toBeTruthy();
    expect(screen.getByText('Sign Out of Account')).toBeTruthy();
  });
});
