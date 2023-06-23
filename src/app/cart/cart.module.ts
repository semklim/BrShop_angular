// cart.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent, CartItemsComponent, ShippingAddressComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: CartComponent }])],
})
export class CartModule {}
