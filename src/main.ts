import {bootstrapApplication, provideClientHydration} from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializeKeycloak } from './app/initializeKeycloak';
import {provideHttpClient} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
}).catch(err => console.error(err));
