import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Product } from '../product/product.component';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Get all products from API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      map(products => products.map(product => ({
        productID: product.productID || '', // Ensure required fields are present
        productPrice: product.productPrice || 0, // Ensure productPrice is a number
        productTitle: product.productTitle || '', // Ensure required fields are present
        productImage: product.productImage || '',
        productDescription: product.productDescription || '',
        printProduct: product.printProduct || (() => '') // Default function if missing
      }) as Product)) // Cast to Product to match the interface
    );
  }

  // Get current cart items
  getCartItems(): Observable<ShoppingCartItem[]> {
  return this.http.get<any[]>(`${this.apiUrl}/cart`).pipe(
    map(items => items.map(item => new ShoppingCartItem(item.itemProduct, item.quantity)))
  );
}


  // Add item to cart
  addToCart(item: ShoppingCartItem): Observable<void> {
  return this.getCartItems().pipe(
    map(cart => {
      const existingItem = cart.find(ci => ci.itemProduct.productID === item.itemProduct.productID);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.push(item);
      }
      return cart;
    }),
    // Send updated cart
    switchMap(updatedCart => this.updateCart(updatedCart))
  );
}


  // Remove item from cart
  removeFromCart(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${productId}`);
  }

  // Update entire cart
  updateCart(items: ShoppingCartItem[]): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/cart`, items);
}

clearCart(): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/cart`);
}

  // Calculate total
  calculateTotal(items: ShoppingCartItem[]): number {
    return items.reduce((total, item) => 
      total + ((item.itemProduct.productPrice ?? 0) * item.quantity), 0);
  }
  updateQuantity(productId: string, change: number): Observable<any> {
  return this.http.patch(`${this.apiUrl}/cart/${productId}`, { change });
}

}