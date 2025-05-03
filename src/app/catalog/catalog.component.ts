import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/CartService';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';
@Component({
  imports: [CommonModule, RouterModule],
  standalone: true,
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  quantities: { [productId: string]: number } = {}; 

  @Input() products: Product[] = [];
  isLoading = true;

  @Input() myValue: string = "";
  filter: string = "";
  debug: any;
  ngOnInit(): void {
    this.loadProducts();
  }
  constructor(private cartService: CartService, private router: Router) {   }

  loadProducts(): void {
    this.cartService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        // Initialize quantities
        products.forEach(product => {
          this.quantities[product.productID] = 1;
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

  adjustQuantity(productId: string, change: number): void {
    const newQuantity = this.quantities[productId] + change;
    this.quantities[productId] = Math.max(1, newQuantity);
  }
  viewDetails(product: Product): void {
    this.router.navigate(['/products', product.productID]);
  }
  
  
  addToCart(product: Product): void {
  const quantity = this.quantities[product.productID];
  const cartItem = new ShoppingCartItem(product, quantity);
  
  this.cartService.addToCart(cartItem).subscribe({
    next: () => {
      this.quantities[product.productID] = 1; // Reset quantity
    },
    error: (err) => {
      console.error('Failed to add to cart', err);
    }
  });
}
  
}
