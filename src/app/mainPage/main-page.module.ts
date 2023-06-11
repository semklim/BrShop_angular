import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from './productCard/card.component';
import { ImageSliderModule } from '../imageSlider/imageSlider.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPageComponent, CardComponent],
  imports: [CommonModule, AppRoutingModule, ImageSliderModule, FormsModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
