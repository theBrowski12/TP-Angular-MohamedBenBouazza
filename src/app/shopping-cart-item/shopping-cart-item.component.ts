import { Product } from "../product/product.component"


export class ShoppingCartItem {
  public get quantity(): number {
    return this._quantity
}
public set quantity(value: number) {
    this._quantity = value
}

constructor(readonly itemProduct: Product, private _quantity: number = 1) {
  
}
get lineTotal(): number {
    return (Number(this.itemProduct.productPrice) ?? 0) * this.quantity;
  }
get subtotal(): number {
    return (Number(this.itemProduct?.productPrice) ?? 0) * this.quantity;
  }
}
