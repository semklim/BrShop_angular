import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  private prods: string[] = [];

  constructor(private products: CartItemsService) {}

  ngOnInit() {
    this.prods = this.products.getProducts();
  }
}
