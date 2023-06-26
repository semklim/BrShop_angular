import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../types/products';
import { FBaseService } from 'src/app/services/fireStore/fbase.service';
import { Review } from 'src/app/types/review';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private routeSubscription?: Subscription;

  prod?: Product | null;

  docId?: string;

  selectedSize: null | HTMLElement | undefined = null;

  constructor(private route: ActivatedRoute, private prodService: FBaseService) {}

  private validationComments(comment: string) {
    return comment
      .replace(/(кокос|банан)/gi, '*****')
      .replace(/@/gi, '*')
      .replace(/плохой/gi, '******');
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.docId = params['id'];
      this.prodService.getProduct(this.docId!).then((data) => (this.prod = data));
    });
  }

  async refreshReviews(review: Review) {
    const reviewId = this.prodService.genFireId();
    review.review_id = reviewId;
    if (this.prod) {
      review.comment = this.validationComments(review.comment);
      this.prod.reviews.push(review);
      this.prodService.updateData(this.docId as string, this.prod as Partial<Product>);
    }
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
