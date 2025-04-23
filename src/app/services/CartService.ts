// cart.service.ts
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';
import { Product } from '../product/product.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ShoppingCartItem[] = [];
  private cartUpdated = new Subject<void>(); 
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(
      item => item.itemProduct.productID === product.productID
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push(new ShoppingCartItem(product, quantity));
    }
    alert(`Added ${quantity} of ${product.productTitle} to cart.`);
  }

  removeFromCart(productId: string, quantity: number = 1): void {
    const itemIndex = this.cartItems.findIndex(
      item => item.itemProduct.productID === productId
    );

    if (itemIndex !== -1) {
      this.cartItems[itemIndex].quantity -= quantity;
      
      if (this.cartItems[itemIndex].quantity <= 0) {
        this.cartItems.splice(itemIndex, 1);
      }
    }
  }

  getCartItems(): ShoppingCartItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total: number, item) => total + (Number(item.itemProduct.productPrice ?? 0) * item.quantity),
      0
    );
  }
  updateQuantity(productId: string, change: number): void {
    const item = this.cartItems.find(i => i.itemProduct.productID === productId);
    if (item) {
      item.quantity += change;
      this.cartUpdated.next();
    }
  }
}