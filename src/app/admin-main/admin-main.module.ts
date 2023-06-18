import { NgModule } from '@angular/core';
import { AdminMainComponent } from './admin-main.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdminMainComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: AdminMainComponent }]),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AdminMainModule {}
