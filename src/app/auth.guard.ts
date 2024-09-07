// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {

        // If not authenticated, initiate login
        await this.keycloak.login({
          redirectUri: window.location.origin + state.url,  // Redirect back after login
        });
      } else {
        // If authenticated, allow access to the route
        resolve(true);
      }
    });
  }
}
