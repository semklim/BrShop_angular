import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      username: buildForm.control('', [Validators.minLength(3), Validators.required]),
      rating: buildForm.control('5', [Validators.minLength(3), Validators.required]),
      comment: buildForm.control('', [Validators.minLength(6), Validators.required]),
    });
  }

  submit() {
    console.log(this.reviewForm.value);
    this.reviewChange.emit(this.reviewForm.value);
    this.reviewForm.reset();
  }
}
