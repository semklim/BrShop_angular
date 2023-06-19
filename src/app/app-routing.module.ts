import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { MainPageComponent } from './mainPage/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin-main/admin-main.module').then((m) => m.AdminMainModule),
    canActivate: [AdminGuard],
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'product/:id',
    loadChildren: () => import('./ProductPage/product.module').then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
