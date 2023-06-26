import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../types/products';
import { FBaseService } from 'src/app/services/fireStore/fbase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private routeSubscription?: Subscription;

  prod?: Promise<Product | null>;

  selectedSize: null | HTMLElement | undefined = null;

  constructor(private route: ActivatedRoute, private prodService: FBaseService) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.prod = this.prodService.getProduct(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  selectSize(e: Event | EventTarget | null): void {
    const element = e as HTMLElement;

    if (element instanceof HTMLElement) {
      if (this.selectedSize) {
        this.selectedSize.classList.remove('selected');
        this.selectedSize = null;
      } else {
        this.selectedSize = element;
        this.selectedSize.classList.add('selected');
      }
    }
  }
}
