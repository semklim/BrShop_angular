import { NgModule } from '@angular/core';
import { AdminMainComponent } from './admin-main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminMainComponent],
  imports: [RouterModule.forChild([{ path: '', component: AdminMainComponent }])],
})
export class AdminMainModule {}
