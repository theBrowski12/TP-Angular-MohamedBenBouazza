import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule, FormsModule],
})


  export class AddProductComponent {
  newProduct = {
    productTitle: '',
    productPrice: 0,
    productDescription: ''
  };
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
constructor(
    private apiService: ApiService,
    private router: Router
  ) {}
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Generate preview
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('productTitle', this.newProduct.productTitle);
    formData.append('productPrice', this.newProduct.productPrice.toString());
    formData.append('productDescription', this.newProduct.productDescription);
    formData.append('image', this.selectedFile); // Append the file

    this.apiService.addProduct(formData).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err) => alert('Error: ' + err.message)
    });
  }
}