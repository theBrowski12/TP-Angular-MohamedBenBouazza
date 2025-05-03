// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product/product.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://your-api-endpoint.com/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getCart(): Observable<ShoppingCartItem[]> {
    return this.http.get<ShoppingCartItem[]>(`${this.apiUrl}/cart`);
  }

  addToCart(item: ShoppingCartItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, item);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${productId}`);
  }
}