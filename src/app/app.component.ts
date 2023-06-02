import { Component, OnInit } from '@angular/core';
import { Product } from './types/products';
import { GetProductsService } from './GlobalServices/getProducts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  prod?: Product[];

  constructor(public productsServ: GetProductsService) {}

  ngOnInit(): void {
    this.productsServ.getJSON().subscribe((data) => {
      this.prod = Object.values(data);
    });
  }
}
