import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  private routeSubscription: Subscription;

  id?: string;

  constructor(private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe((params) => (this.id = params['id']));
  }
}
