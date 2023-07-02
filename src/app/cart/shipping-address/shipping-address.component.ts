import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
})
export class ShippingAddressComponent {
  constructor(private router: Router) {}

  goToCheckout() {
    this.router.navigate(['./']);
  }
}
