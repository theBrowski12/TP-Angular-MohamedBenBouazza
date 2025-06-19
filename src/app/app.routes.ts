import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ShoppingCart } from './shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

export const routes: Routes = [
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: ShoppingCart },
    { path: 'home', component: CatalogComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-product', component: AddProductComponent }, 
    { path: 'orders', component: OrderHistoryComponent},
    { path: 'orders/:id', component: OrderDetailsComponent },
    { path: 'order-confirmation/:id',component: OrderConfirmationComponent },
    { path: '', redirectTo: '/catalog', pathMatch: 'full' }
];
