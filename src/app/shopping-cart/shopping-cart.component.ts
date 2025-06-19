import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/CartService';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';
import { OrderService } from '../services/order.service';
import { FormsModule } from '@angular/forms';
import { Order, OrderStatus } from '../models/order.model';
import { switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCart implements OnInit {
  cartItems: ShoppingCartItem[] = [];
  total: number = 0;

   constructor(
    private cartService: CartService,
    private orderService: OrderService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

loadCart(): void {
  this.cartService.getCartItems().subscribe(items => {
    this.cartItems = items.map(item => {
      const cartItem = new ShoppingCartItem(item.itemProduct, item.quantity);
      return cartItem;
    });
    this.total = this.cartService.calculateTotal(this.cartItems);
  });
}

shippingAddress = {
  street: '',
  city: '',
  zipCode: '', 
  country: ''
};

  removeItem(item: ShoppingCartItem): void {
  this.cartService.getCartItems().subscribe(cart => {
    const updatedCart = cart.filter(i => i.itemProduct.productID !== item.itemProduct.productID);
    this.cartService.updateCart(updatedCart).subscribe(() => {
      this.loadCart();
    });
  });
}




  goBack(): void {
    this.router.navigate(['/catalog']);
  }
increaseQuantity(item: ShoppingCartItem): void {
  this.cartService.updateQuantity(item.itemProduct.productID, 1).subscribe(() => {
    this.loadCart(); // Fetch updated cart
  });
}

decreaseQuantity(item: ShoppingCartItem): void {
  if (item.quantity > 1) {
    this.cartService.updateQuantity(item.itemProduct.productID, -1).subscribe(() => {
      this.loadCart(); // Fetch updated cart
    });
  } else {
    this.removeItem(item);
  }
}


checkOut(cartItems: ShoppingCartItem[]) {
    if (cartItems.length > 0) {
      const phoneNumber = '212646564984'; 
      const shippingAddress = this.shippingAddress;
      const productList = cartItems.map(item => `${item.itemProduct.productTitle} (Quantity: ${item.quantity})`).join(', ');
      const message = `Hello, I would like to buy the following products: ${productList}, Adresse de livraison: ${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.zipCode}, ${shippingAddress.country}.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;  
      window.location.href = whatsappUrl;
  
    } else {
      alert('Your cart is empty!');
    }
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.total = 0;
      },
      error: (err) => {
        console.error('Error clearing cart', err);
      }
    });
  }
getProductImageUrl(path: string): string {
  // For uploaded products (contains 'products' in path)
  if (path.includes('/products/')) {
    return `http://localhost:3000${path}`;
  }
  // For static assets
  return path.startsWith('assets/') ? `/${path}` : path;
}

handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = '/assets/images/placeholder.jpg';
}
private handleSuccessfulOrder(order: any): void {
  // 1. Vider le panier
  this.cartService.clearCart().subscribe({
    next: () => {
      // 2. Rediriger vers la confirmation
      this.router.navigate(['/order-confirmation', order.id]);
      
      // 3. (Optionnel) Envoyer notification WhatsApp
      this.sendWhatsAppConfirmation(order);
    },
    error: (err) => {
      console.error('Error clearing cart', err);
      // On redirige quand même vers la confirmation
      this.router.navigate(['/order-confirmation', order.id]);
    }
  });
}
private sendWhatsAppConfirmation(order: Order): void {
    const phoneNumber = '212646564984'; // Numéro marocain format international
    const productList = order.items.map(item => 
      `${item.productTitle} (${item.quantity}x)`
    ).join(', ');
    
    const message = `Confirmation de commande #${order.id.slice(0, 8)}\n\n` +
                    `Produits: ${productList}\n` +
                    `Total: ${order.total} DH\n` +
                    `Adresse: ${order.shippingAddress.street}, ${order.shippingAddress.city}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Ouvrir dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
  }
}
