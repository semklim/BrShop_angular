import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/types/products';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() isDisableDelete = false;

  @Input() product?: Product;

  @Input() cardMinHeight = 350;

  @Output() deleteProductChange = new EventEmitter();
}
