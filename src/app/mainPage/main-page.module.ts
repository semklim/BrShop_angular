import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
