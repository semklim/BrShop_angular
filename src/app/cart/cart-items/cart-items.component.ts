import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { FBaseService } from 'src/app/services/fireStore/fbase.service';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  private prods: string[] | Product[] = [];

  size: string[] | undefined;

  shippingPrice = 10;

  subtotalPrice = 0;

  totalPrice = 0;

  dataLoaded = false;

  filteredProds: Product[] = [];

  n = 0;

  constructor(private products: CartItemsService, private fService: FBaseService, private sizes: CartItemsService) {}

  ngOnInit() {
    const productPromises: any[] = [];
    const savedSizes = localStorage.getItem('cartSizes');
    this.sizes.clearSizes();
    this.size = JSON.parse(savedSizes as string);
    const savedCartItems = localStorage.getItem('cartItems');
    this.filteredProds = JSON.parse(savedCartItems as string);
    this.dataLoaded = true;
    if (localStorage.getItem('cartItems')) {
      Promise.all(productPromises).then(() => {
        for (let i = 0; i < this.size!.length; i++) {
          if (this.filteredProds[i].size === undefined) {
            this.filteredProds[i].size = this.size![i];
          }
        }
        localStorage.setItem('cartItems', JSON.stringify(this.filteredProds));
      });
    }
    for (let i = 0; i < this.filteredProds!.length; i++) {
      if (this.filteredProds[i].size === undefined) {
        this.filteredProds[i].size = this.size![this.n];
        this.n++;
      }
    }
    this.updateSubtotalPrice(this.filteredProds);
    this.products.clearProducts();
  }

  updateSubtotalPrice(mass: Product[]) {
    this.subtotalPrice = 0;
    for (let i = 0; i < mass.length; i++) {
      this.subtotalPrice += mass[i].price;
    }
    if (this.subtotalPrice >= 100) {
      this.shippingPrice = 0;
    }
    this.totalPrice = this.subtotalPrice + this.shippingPrice;
  }

  deleteProduct(index: number) {
    const product = this.filteredProds[index];
    this.filteredProds.splice(index, 1);
    this.size!.splice(index, 1);
    this.products.amountProducts$.next(this.filteredProds.length);
    this.updateSubtotalPrice(this.filteredProds);
    localStorage.setItem('cartSizes', JSON.stringify(this.size));
    localStorage.setItem('cartItems', JSON.stringify(this.filteredProds));
    localStorage.setItem('subtotalPrice', this.subtotalPrice.toString());
    localStorage.setItem('totalPrice', this.totalPrice.toString());
  }
}
