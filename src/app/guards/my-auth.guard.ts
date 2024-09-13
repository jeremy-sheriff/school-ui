import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular'; // Use Keycloak Service for authentication

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate {

  constructor(
    private keycloak: KeycloakService, // Use KeycloakService to handle authentication
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Step 1: Check if the user is authenticated using Keycloak
    const isAuthenticated = await this.keycloak.isLoggedIn();

    // If not authenticated, redirect to Keycloak login page
    if (!isAuthenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
      return false; // Wait for login
    }

    // Step 2: Check for required roles
    const requiredRoles = route.data['roles'] as string[];
    const userRoles = this.keycloak.getUserRoles();

    // If roles are specified in the route and the user doesn't have the required roles, redirect to unauthorized
    if (requiredRoles && !requiredRoles.every(role => userRoles.includes(role))) {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized page if role doesn't match
      return false;
    }

    // Allow access if authenticated and roles match
    return true;
  }
}
