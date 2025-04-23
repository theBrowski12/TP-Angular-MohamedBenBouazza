import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product.component';
import { CartService } from '../services/CartService'; // Your existing service
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      
      const catalog = new CatalogComponent(this.cartService, this.router);
      this.product = catalog.products.find(p => p.productID === productId);
      
      if (!this.product) {
        // Fallback to empty product if not found
        this.product = new Product(productId);
      }
    }
  }

  adjustQuantity(change: number): void {
    this.quantity = Math.max(1, this.quantity + change);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }
}