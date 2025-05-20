import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ShoppingCart } from './shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: ShoppingCart },
    { path: 'home', component: CatalogComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/catalog', pathMatch: 'full' }
];
