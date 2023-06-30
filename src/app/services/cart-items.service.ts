import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private products: string[] = [];

  getProducts() {
    console.log(this.products);
    return this.products;
  }

  setProducts(data: string) {
    this.products.push(data);
    console.log(this.products);
  }
}
