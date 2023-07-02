import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private products: string[] = [];

  private sizes: string[] = [];

  getProducts() {
    return this.products;
  }

  setProducts(data: string) {
    this.products.push(data);
  }

  getSizes() {
    return this.sizes;
  }

  setSizes(data: string) {
    this.sizes.push(data);
    console.log(this.sizes);
  }
}
