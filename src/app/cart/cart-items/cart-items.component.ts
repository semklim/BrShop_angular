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

  private filteredProds: string[] | Product[] = [];

  constructor(private products: CartItemsService, private fService: FBaseService) {}

  ngOnInit() {
    if (this.products.getProducts().length > 0) {
      this.prods = this.products.getProducts();
      console.log(this.fService.getProduct(this.prods[0]));
      for (let i = 0; i < this.products.getProducts().length; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.filteredProds.push(this.fService.getProduct(this.prods[i]).then());
      }
      console.log(this.filteredProds);
    }
  }
}
