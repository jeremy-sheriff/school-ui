// src/app/initializeKeycloak.ts
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://muhohodev.com/keycloak/auth', // Your Keycloak URL
        realm: 'school',               // Your Keycloak Realm
        clientId: 'students-service'         // Your Keycloak Client ID
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + 'silent-check-sso.html'
      }
    });
}
