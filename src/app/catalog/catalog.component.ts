import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CartService } from '../services/CartService';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  quantities: { [productId: string]: number } = {}; 
filteredProducts: Product[] = [];
  @Input() products: Product[] = [];
  isLoading = true;

  @Input() myValue: string = "";
  filter: string = "";
  debug: any;
  ngOnInit(): void {
    this.loadProducts();
    
    this.applySearchFilter();
    this.route.queryParams.subscribe(params => {
      this.applySearchFilter(params['search']);
    });
  }
  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute) {   }
  applySearchFilter(searchTerm: string = '') {
    if (!searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.productTitle?.toLowerCase().includes(term) ||
      product.productDescription?.toLowerCase().includes(term)
    );
  }
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
  
}
