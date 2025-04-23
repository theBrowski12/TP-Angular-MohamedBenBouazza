import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShoppingCart } from './shopping-cart/shopping-cart.component';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
