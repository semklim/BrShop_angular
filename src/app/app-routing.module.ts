import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth.guard';
import { MainPageComponent } from './mainPage/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin-main/admin-main.module').then((m) => m.AdminMainModule),
    canActivate: [AdminGuard],
  },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule) },
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
