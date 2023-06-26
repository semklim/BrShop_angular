import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, StarRatingModule.forRoot()],
  exports: [ReviewComponent],
})
export class ReviewModule {}
