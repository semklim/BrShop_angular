import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../types/products';
import { FBaseService } from '../GlobalServices/fbase.service';
import { Subscription } from 'rxjs';
import { LocalDataService } from '../GlobalServices/localData.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  prod?: Product[];

  allProdSub: Subscription | null = null;

  constructor(private prodService: FBaseService, private local: LocalDataService) {}

  ngOnInit(): void {
    this.allProdSub = this.getAllProducts();
  }

  getAllProducts(): Subscription {
    return this.prodService.getAllProducts().subscribe((products) => {
      this.prod = products;
    });
  }

  ngOnDestroy() {
    this.allProdSub?.unsubscribe();
  }

  getData(product: Product) {
    this.prodService.getProduct(product).then((data) => {
      console.log(data);
    });
  }
}
