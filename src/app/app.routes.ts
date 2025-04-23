import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ShoppingCart } from './shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: ShoppingCart },
    { path: 'home', component: CatalogComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: '', redirectTo: '/catalog', pathMatch: 'full' }
];
