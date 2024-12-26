import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Subscribe to keycloak events
  // this.keycloakService.keycloakEvents$.subscribe({
  //   next: (event) => {
  //     if (event.type === KeycloakEventType.OnTokenExpired) {
  //       // Refresh the token when it is about to expire
  //       this.keycloakService.updateToken(20).then((refreshed) => {
  //         if (refreshed) {
  //           console.log('Token was successfully refreshed');
  //         } else {
  //           console.log('Token is still valid');
  //         }
  //       }).catch(() => {
  //         console.error('Failed to refresh token');
  //       });
  //     }
  //   }
  // });

  // it(`should have the 'angular-ui-app' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('angular-ui-app');
  // });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-ui-app');
  });
});
