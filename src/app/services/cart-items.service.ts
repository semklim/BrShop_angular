import { Injectable } from '@angular/core';
import { Product } from '../types/products';

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
  }

  removeProduct(product: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i] === product) {
        this.products.splice(i, 1);
      }
    }
  }

  clearProducts() {
    this.products = [];
  }
}
