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

  private readonly wordsToReplace = ['банан', 'кокос', 'плохой', '@'];

  private readonly wordsPattern = new RegExp(this.wordsToReplace.join('|'), 'gi');

  prod?: Product | null;

  docId?: string;

  selectedSize: null | HTMLElement | undefined = null;

  constructor(private route: ActivatedRoute, private prodService: FBaseService) {}

  private validationComments(comment: string) {
    return comment.replace(this.wordsPattern, (match) => '*'.repeat(match.length));
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
      //add new review
      this.prod.reviews.push(review);
      //recalculate rating base on review ratings
      this.prod.rating = this.recalculateRating(this.prod);
      //update document on server fireBase
      this.prodService.updateData(this.docId as string, this.prod as Partial<Product>);
    }
  }

  recalculateRating(product: Product): number {
    const amountReviews = product.reviews.length;
    if (amountReviews && amountReviews >= 1) {
      let sumOfRatings = 0;
      for (let i = 0; i < amountReviews; i += 1) {
        const el = product.reviews[i];
        sumOfRatings += el.rating;
      }

      return sumOfRatings / amountReviews;
    }
    return 0;
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
