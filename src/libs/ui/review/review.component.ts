import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/types/products';
import { Review } from 'src/app/types/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  @Input() reviewData?: Review[];

  @Output() reviewChange: EventEmitter<Review> = new EventEmitter();

  review: Review = {
    rating: 0,
    review_id: '',
    comment: '',
    username: '',
  };

  reviewForm: FormGroup;

  constructor(private buildForm: FormBuilder) {
    this.reviewForm = buildForm.group({
      username: ['', [Validators.minLength(2), Validators.required]],
      rating: ['0', [Validators.minLength(2), Validators.required]],
      comment: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  isInvalid(context: AbstractControl<any, any>) {
    return context && context.invalid && context.dirty;
  }

  submit() {
    console.log(this.reviewForm.value);
    this.reviewChange.emit(this.reviewForm.value);
    this.reviewForm.reset();
    this.reviewForm.controls['rating'].reset();
  }
}
