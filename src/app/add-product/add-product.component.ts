import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Product } from '../product/product.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [FormsModule]
})
export class AddProductComponent {
  newProduct: Partial<Product> = {
    productTitle: '',
    productPrice: 0,
    productImage: '',
    productDescription: ''
  };

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.apiService.addProduct(this.newProduct as Product).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err) => console.error('Failed to add product:', err)
    });
  }
}