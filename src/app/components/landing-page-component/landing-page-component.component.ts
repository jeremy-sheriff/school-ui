import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'landing-page-component',
  standalone: true,
  templateUrl: './landing-page-component.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './landing-page-component.component.css'
})
export class LandingPageComponentComponent {


}
