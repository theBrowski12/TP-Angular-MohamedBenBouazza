import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/CartService';
@Component({
  imports: [CommonModule, RouterModule],
  standalone: true,
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  quantities: { [productId: string]: number } = {}; 

  @Input() products: Product[] = [
    new Product("P001"),
    new Product("P002"),
    new Product("P003"),
    new Product("P004"),
    new Product("P005"),
    new Product("P006"),
    new Product("P007"),
    new Product("P008"),
  ];

  @Input() myValue: string = "";
  filter: string = "";
debug: any;

  constructor(private cartService: CartService, private router: Router) { 
    this.products.forEach(product => {
      this.quantities[product.productID] = 1;
    }); 
    // Initialize products with data
    this.products[0].productTitle = 'iPhone 14 Pro';
    this.products[0].productPrice = 6999.99;
    this.products[0].productImage = './assets/images/iphone-14.png'; 
    this.products[0].productDescription = 'Latest iPhone 14 model with advanced features.';
    
    this.products[1].productTitle = 'Samsung TV';
    this.products[1].productPrice = 12999.99;
    this.products[1].productImage = './assets/images/tv-samsung-48.png';
    this.products[1].productDescription = 'Samsung 48 inch TV with 4K resolution.';
    
    this.products[2].productTitle = 'Tablette';
    this.products[2].productPrice = 1999.99;
    this.products[2].productImage = './assets/images/samsung-tab-12.png';
    this.products[2].productDescription = '12 inch tablet with high resolution display.';

    this.products[3].productTitle = 'Samsung Tab';
    this.products[3].productPrice = 2999.99;
    this.products[3].productImage = './assets/images/samsung-tab-12.png';
    this.products[3].productDescription = 'Samsung Tab with 12 inch display and high performance.';

    this.products[4].productTitle = 'iPhone 14 Pro Max';
    this.products[4].productPrice = 8999.99;
    this.products[4].productImage = './assets/images/iphone-14.png';
    this.products[4].productDescription = 'iPhone 14 Pro Max with larger display and advanced features.';

    this.products[5].productTitle = 'Trotinette Xiaomi';
    this.products[5].productPrice = 5999.99;
    this.products[5].productImage = './assets/images/trotinette.jpg';
    this.products[5].productDescription = 'Xiaomi electric scooter with long battery life.';

    this.products[6].productTitle = 'Trotinette EcoXtreme';
    this.products[6].productPrice = 8999.99;
    this.products[6].productImage = './assets/images/trotinette.jpg';
    this.products[6].productDescription = 'Bison electric scooter with fqst acceleration and endures heavy wheights';

    this.products[7].productTitle = 'Xiaomi TV';
    this.products[7].productPrice = 3999.99;
    this.products[7].productImage = './assets/images/tv-samsung-48.png';
    this.products[7].productDescription = 'Xioami TV, Enjoy High reolution with low price.';
  }

  ngOnInit(): void {
    console.log("Products:", this.products);
  }
  adjustQuantity(productId: string, change: number): void {
    const newQuantity = this.quantities[productId] + change;
    this.quantities[productId] = Math.max(1, newQuantity);
  }
  viewDetails(product: Product): void {
    this.router.navigate(['/products', product.productID], {
      state: { product } // Pass the product data
    });
  }
  
  
  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.quantities[product.productID]);
    this.quantities[product.productID] = 1; // Reset quantity after adding to cart
  }
  
}
