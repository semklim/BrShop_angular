import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private products: object[] = [];

  private sizes: string[] = [];

  public amountProducts$ = new BehaviorSubject<number>(0);

  getProducts() {
    return this.products;
  }

  setProducts(data: object) {
    this.products.push(data);
    const len = this.products.length;
    if (len > 0) {
      this.amountProducts$.next(len);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.products));
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
    if (data !== undefined) {
      this.sizes.push(data);
      localStorage.setItem('cartSizes', JSON.stringify(this.sizes));
    }
  }

  clearProducts() {
    this.products = [];
    localStorage.setItem('cartItems', JSON.stringify(this.products));
    const len = this.products.length;
    if (len > 0) {
      this.amountProducts$ = 0 as unknown as BehaviorSubject<number>;
    }
  }

  clearSizes() {
    this.sizes = [];
    localStorage.setItem('cartSizes', JSON.stringify(this.sizes));
  }
}
