// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product/product.component';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/products`);
  }
  getCart(): Observable<ShoppingCartItem[]> {
    return this.http.get<ShoppingCartItem[]>(`${this.apiUrl}/api/cart`);
  }

  addToCart(item: ShoppingCartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/cart`, item);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/cart/${productId}`);
  }
addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${this.apiUrl}/api/products`, product);
}

updateProduct(productId: string, product: Partial<Product>): Observable<Product> {
  return this.http.put<Product>(`${this.apiUrl}/api/products/${productId}`, product);
}

deleteProduct(productId: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/api/products/${productId}`);
}
}