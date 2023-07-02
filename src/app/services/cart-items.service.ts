import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private products: string[] = [];

  private sizes: string[] = [];

  public amountProducts$ = new BehaviorSubject<number>(0);

  getProducts() {
    return this.products;
  }

  setProducts(data: string) {
    this.products.push(data);
    const len = this.products.length;
    if (len > 0) {
      this.amountProducts$.next(len);
    }
  }

  getAmountProductsInCart() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const arrProd = JSON.parse(savedCartItems) as Product[];
      this.amountProducts$.next(arrProd.length);
    }
    return this.amountProducts$.asObservable();
  }

  getSizes() {
    return this.sizes;
  }

  setSizes(data: string) {
    this.sizes.push(data);
  }

  removeProduct(docId: string) {
    this.products = this.products.filter((prod) => prod !== docId);
  }

  clearProducts() {
    this.products = [];
  }
}
