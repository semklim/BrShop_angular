import { Component } from '@angular/core';
import { Product } from './types/products';
import { GetProductsService } from './GlobalServices/getProducts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  prod?: Product[];

  constructor(public productsServ: GetProductsService) {
    productsServ.getJSON().subscribe((data) => {
      this.prod = data;
    });
  }
}
