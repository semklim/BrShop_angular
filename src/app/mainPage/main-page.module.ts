import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchModule } from 'src/libs/ui/searchBar/search.module';
import { ImageSliderModule } from 'src/libs/ui/imageSlider/imageSlider.module';
import { CardComponent } from 'src/libs/ui/productCard/card.component';
import { LoadingModule } from 'src/libs/ui/loading/loading.module';
@NgModule({
  declarations: [MainPageComponent, CardComponent],
  imports: [CommonModule, LoadingModule, AppRoutingModule, ImageSliderModule, SearchModule, FormsModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
