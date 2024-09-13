import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = {
    isAuthenticated: false, // Change this to simulate login status
    roles: [] as string[] // Change this to simulate user roles
  };

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser.isAuthenticated;
  }

  // Check if the user has all the required roles
  hasRequiredRoles(requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // If no roles are required, allow access
    }
    return requiredRoles.every(role => this.currentUser.roles.includes(role));
  }

  // Simulate a login by setting user roles and authentication status
  login(roles: string[]): void {
    this.currentUser.isAuthenticated = true;
    this.currentUser.roles = roles;
  }

  // Simulate a logout by clearing authentication status
  logout(): void {
    this.currentUser.isAuthenticated = false;
    this.currentUser.roles = [];
  }
}
