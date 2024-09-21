// src/app/initializeKeycloak.ts
import { KeycloakService } from 'keycloak-angular';
import {environment} from "../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
  console.log(environment.keycloak_base_url)
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak_base_url+'/keycloak/auth', // Your Keycloak URL
        realm: 'school',               // Your Keycloak Realm
        clientId: 'students-service'         // Your Keycloak Client ID
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + 'silent-check-sso.html'
      }
    });
}
