import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
    return this.http.get<ShoppingCartItem[]>(`${this.apiUrl}/cart`);
  }

  // Add item to cart
  addToCart(item: ShoppingCartItem): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cart`, [item]);
  }

  // Remove item from cart
  removeFromCart(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${productId}`);
  }

  // Update entire cart
  updateCart(items: ShoppingCartItem[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cart`, items);
  }

  // Calculate total
  calculateTotal(items: ShoppingCartItem[]): number {
    return items.reduce((total, item) => 
      total + ((item.itemProduct.productPrice ?? 0) * item.quantity), 0);
  }
  updateQuantity(productId: string, change: number): Observable<any> {
    // This assumes your API supports PATCH requests for quantity updates
    return this.http.patch(`${this.apiUrl}/${productId}`, { change });
  }
}