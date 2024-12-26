import { Component, OnInit } from '@angular/core';
import { KeycloakEventType, KeycloakService } from "keycloak-angular";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { faClipboard, faHome, faBook, faUsers, faGraduationCap, faSignOutAlt, } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-component',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    FaIconComponent,
    RouterLink,
    NgClass,
    NgIf
  ]
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = true;
  isSubMenuVisible: boolean = true;
  isAuthenticated = false;
  userRoles: string[] = [];

  // Font Awesome icons
  faHome = faHome;
  faStudents = faUsers;
  faLibrary = faBook;
  faCourses = faGraduationCap;
  faLogout = faSignOutAlt;
  faClipboard = faClipboard;

  // Version information
  libraryImage: string = '';
  studentsImage: string = '';
  uiImage: string = '';

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
  ) {}

  async ngOnInit() {
    // Check if the user is authenticated
    this.isAuthenticated = await this.keycloakService.isLoggedIn();

    if (this.isAuthenticated) {
      this.userRoles = this.keycloakService.getUserRoles();
    }

    // Fetch version details from window.config if available
    // @ts-ignore
    if (window['config']) {
      // @ts-ignore
      this.libraryImage = window['config'].LIBRARY_IMAGE;
      // @ts-ignore
      this.studentsImage = window['config'].STUDENTS_IMAGE;
      // @ts-ignore
      this.uiImage = window['config'].UI_IMAGE;
    }

    // Subscribe to Keycloak events
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        if (event.type === KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(20).then(() => {
          });
        }
      }
    });
  }

  // Check if the user has at least one of the specified roles
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.userRoles.includes(role));
  }

  // Login the user
  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin + '/landing'
    });
  }

  // Toggle the sidebar
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  // Toggle the Students sub-menu
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  // Logout the user
  logout() {
    this.keycloakService.logout(window.location.origin + "/");
  }
}
