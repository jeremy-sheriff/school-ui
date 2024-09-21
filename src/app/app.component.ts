import { Component } from '@angular/core';
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {OnInit } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-component',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  isAuthenticated = false;

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async ngOnInit() {
    this.isAuthenticated = this.keycloakService.isLoggedIn();

    console.log("Authenticated = " + this.isAuthenticated);


    // Subscribe to keycloak events
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        if (event.type === KeycloakEventType.OnTokenExpired) {
          // Refresh the token when it is about to expire
          this.keycloakService.updateToken(20).then((refreshed) => {
            if (refreshed) {
              console.log('Token was successfully refreshed');
            } else {
              console.log('Token is still valid');
            }
          }).catch(() => {
            console.error('Failed to refresh token');
          });
        }
      }
    });
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin + '/landing'  // Redirect to protected component
    });
  }

  //
  logout() {
    this.keycloakService.logout(window.location.origin + "/");
  }

}
