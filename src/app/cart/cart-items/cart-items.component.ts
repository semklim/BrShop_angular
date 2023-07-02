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
      console.log('we here');
      this.prods = this.products.getProducts();
      this.filteredProds = []; // Clear the array before populating it
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
          console.log('we hereee');
        }
        this.dataLoaded = true;
      });
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
    console.log(this.filteredProds);
    const product = this.filteredProds[index];
    this.filteredProds.splice(index, 1);
    this.subtotalPrice -= product.price; // Update the subtotal price
    this.updateTotalPrice(); // Update the total price
  }
}
