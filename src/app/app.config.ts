import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
