import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../types/products';
import { FBaseService } from '../services/fbase.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  private productsOrigin?: Observable<Product[]>;

  prod$?: Observable<Product[]>;

  constructor(private prodService: FBaseService) {}

  ngOnInit(): void {
    this.productsOrigin = this.prod$ = this.prodService.getAllProducts();
  }

  submit(value: string) {
    this.prod$ = this.filterProductsByTitles(value);
  }

  filterProductsByTitles(productName: string): Observable<Product[]> | undefined {
    const reg = new RegExp(`${productName}`, 'gi');

    return this.productsOrigin?.pipe(
      map((products: Product[]) => products.filter((product) => reg.test(product.name))),
    );
  }
}
