export class Product {
    private _productTitle?: string | undefined= "Upcoming Product"; 

    public get productTitle(): string | undefined {
      return this._productTitle;
    }
    public set productTitle(value: string | undefined) {
      this._productTitle = value;
    }
  
    private _productPrice?: number | undefined= 0.00; 
    public get productPrice(): number | undefined {
      return this._productPrice;
    }
    public set productPrice(value: number | undefined) {
      this._productPrice = value;
    }

    private _productImage: string= ""; 
    public get productImage(): string {
      return this._productImage;
   }
    public set productImage(value: string) {
      this._productImage = value;
   }
   private _productDescription?: string | undefined="No description"; 
   public get productDescription(): string | undefined {
      return this._productDescription;  
    }
    public set productDescription(value: string | undefined) {
      this._productDescription = value;
    }
    constructor(readonly productID: string) {
   
    }
  
    public printProduct(): string {
      return `
      ID: ${this.productID}
      Nom: ${this.productTitle} 
      Prix: ${this.productPrice}
      Description: ${this.productDescription}`;
    }
  }