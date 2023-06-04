import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../types/products';
import { FBaseService } from '../GlobalServices/fbase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  prod?: Product[];

  allProdSub: Subscription | null = null;

  constructor(private prodService: FBaseService) {}

  ngOnInit(): void {
    this.allProdSub = this.getAllProducts();
  }

  getAllProducts(): Subscription {
    return this.prodService.getAll().subscribe((products) => {
      this.prod = products;
    });
  }

  ngOnDestroy() {
    this.allProdSub?.unsubscribe();
  }
}
