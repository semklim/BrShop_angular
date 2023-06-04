import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth.guard';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { MainPageComponent } from './mainPage/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AdminGuard] },
  { path: 'admin', component: AdminMainComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
