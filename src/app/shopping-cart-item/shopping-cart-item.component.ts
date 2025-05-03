// shopping-cart-item.component.ts
import { Product } from "../product/product.component";

export class ShoppingCartItem {
  private _quantity: number;
  public lineTotal: number;
  public subtotal: number;

  constructor(
    public itemProduct: Product,
    quantity: number = 1
  ) {
    this._quantity = quantity;
    this.lineTotal = this.calculateLineTotal();
    this.subtotal = this.lineTotal;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    this._quantity = value;
    this.updateCalculations();
  }

  private calculateLineTotal(): number {
    return (this.itemProduct.productPrice ?? 0) * this._quantity;
  }

  private updateCalculations(): void {
    this.lineTotal = this.calculateLineTotal();
    this.subtotal = this.lineTotal;
  }
}