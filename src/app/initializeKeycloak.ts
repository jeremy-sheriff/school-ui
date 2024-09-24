// src/app/initializeKeycloak.ts
import { KeycloakService } from 'keycloak-angular';
import {environment} from "../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
  console.log(environment.keycloak_base_url)
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak_base_url+'/keycloak/auth',
        realm: "school",
        clientId: 'students-service'
      },
      initOptions: {
        // onLoad: 'check-sso',
        onLoad: 'login-required',
        // flow:"implicit",
        silentCheckSsoRedirectUri: window.location.origin + 'silent-check-sso.html'
      }
    });
}
