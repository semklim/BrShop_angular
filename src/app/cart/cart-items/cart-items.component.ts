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

  constructor(private products: CartItemsService, private fService: FBaseService, private sizes: CartItemsService) {}

  ngOnInit() {
    this.size = this.sizes.getSizes();
    if (this.products.getProducts().length > 0) {
      this.prods = this.products.getProducts();
      this.filteredProds = [];
      const productPromises = [];
      for (let i = 0; i < this.products.getProducts().length; i++) {
        const promise = this.fService.getProduct(this.prods[i]).then((value: Product | null) => {
          if (value) {
            this.filteredProds.push(value);
            this.updateSubtotalPrice(value.price);
            this.updateTotalPrice();
          }
        });
        productPromises.push(promise);
      }
      Promise.all(productPromises).then(() => {
        for (let i = 0; i < this.filteredProds.length; i++) {
          this.filteredProds[i].size = this.size![i];
        }
        this.dataLoaded = true;
      });
    } else {
      const savedCartItems = localStorage.getItem('cartItems');
      const savedSubtotalPrice = localStorage.getItem('subtotalPrice');
      const savedTotalPrice = localStorage.getItem('totalPrice');
      if (savedCartItems && savedSubtotalPrice && savedTotalPrice) {
        this.filteredProds = JSON.parse(savedCartItems);
        this.subtotalPrice = parseFloat(savedSubtotalPrice);
        this.totalPrice = parseFloat(savedTotalPrice);
        this.dataLoaded = true;
      }
    }
  }

  updateSubtotalPrice(price: number) {
    this.subtotalPrice = this.subtotalPrice + price;
    if (this.subtotalPrice >= 100 || this.shippingPrice != 10) {
      this.shippingPrice = 0;
      this.updateTotalPrice();
    }
    return this.subtotalPrice;
  }

  updateTotalPrice() {
    this.totalPrice = this.subtotalPrice + this.shippingPrice;
    return this.totalPrice;
  }

  deleteProduct(index: number) {
    const product = this.filteredProds[index];
    console.log(product);
    this.filteredProds.splice(index, 1);
    this.subtotalPrice -= product.price;
    this.updateTotalPrice();
    // Удалить продукт из массива products в сервисе CartItemsService
    this.products.removeProduct(product as unknown as string);
    // Сохранить изменения в локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(this.filteredProds));
    localStorage.setItem('subtotalPrice', this.subtotalPrice.toString());
    localStorage.setItem('totalPrice', this.totalPrice.toString());
  }
}
