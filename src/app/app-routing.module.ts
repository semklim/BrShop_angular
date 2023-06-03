import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth.guard';
import { AdminMainComponent } from './admin-main/admin-main.component';

const routes: Routes = [{ path: 'admin', component: AdminMainComponent, canActivate: [AdminGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
