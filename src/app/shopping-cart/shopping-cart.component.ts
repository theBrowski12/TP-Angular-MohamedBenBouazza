import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/CartService';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCart implements OnInit {
  cartItems: ShoppingCartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(item: ShoppingCartItem): void {
    this.cartService.removeFromCart(item.itemProduct.productID);
    this.loadCart(); // Refresh the cart display
  }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }
  increaseQuantity(item: ShoppingCartItem): void {
    this.cartService.updateQuantity(item.itemProduct.productID, 1);
  }

  decreaseQuantity(item: ShoppingCartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.itemProduct.productID, -1);
    } else {
      this.removeItem(item);
    }
  }
}