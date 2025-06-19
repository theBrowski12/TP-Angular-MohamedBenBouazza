import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product.component';
import { CartService } from '../services/CartService';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (!productId) {
          throw new Error('No product ID provided');
        }
        return this.cartService.getProducts().pipe(
          map(products => products.find(p => p.productID === productId))
        );
      })
    ).subscribe({
      next: (product) => {
        this.product = product || new Product(this.route.snapshot.paramMap.get('id') || '');
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product details';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  adjustQuantity(change: number): void {
    this.quantity = Math.max(1, this.quantity + change);
  }

  addToCart(): void {
    if (this.product) {
      const cartItem = new ShoppingCartItem(this.product, this.quantity);
      this.cartService.addToCart(cartItem).subscribe({
        next: () => {
          // Show success message or navigate
          this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Failed to add to cart', err);
          // Show error to user
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }
  getProductImageUrl(path: string | undefined): string {
    if (!path) return '/assets/images/placeholder.jpg';
    
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