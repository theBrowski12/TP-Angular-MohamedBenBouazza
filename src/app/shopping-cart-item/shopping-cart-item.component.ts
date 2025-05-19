// shopping-cart-item.component.ts
import { Product } from "../product/product.component";

export class ShoppingCartItem {
  public quantity: number;
  public lineTotal: number;
  public subtotal: number;

  constructor(
    public itemProduct: Product,
    quantity: number = 1
  ) {
    this.quantity = quantity;
    this.lineTotal = this.calculateLineTotal();
    this.subtotal = this.lineTotal;
  }

  private calculateLineTotal(): number {
    return (this.itemProduct.productPrice ?? 0) * this.quantity;
  }

  public updateCalculations(): void {
    this.lineTotal = this.calculateLineTotal();
    this.subtotal = this.lineTotal;
  }
}
