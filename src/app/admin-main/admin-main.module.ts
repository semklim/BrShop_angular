import { NgModule } from '@angular/core';
import { AdminMainComponent } from './admin-main.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdminMainComponent],
  imports: [RouterModule.forChild([{ path: '', component: AdminMainComponent }]), FormsModule, CommonModule],
})
export class AdminMainModule {}
