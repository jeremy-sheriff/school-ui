import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router, RouterOutlet} from "@angular/router";
import {OnInit } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-component',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NgIf,
    RouterOutlet
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isAuthenticated = false;

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async ngOnInit() {
    this.isAuthenticated = await this.keycloakService.isLoggedIn();

    console.log("Authenticated = " + this.isAuthenticated);
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin + '/landing'  // Redirect to protected component
    });
  }

  logout() {
    this.keycloakService.logout();
  }

}
