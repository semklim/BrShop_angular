import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchModule } from 'src/libs/ui/searchBar/search.module';
import { LoadingModule } from 'src/libs/ui/loading/loading.module';
import { ProductCardModule } from 'src/libs/ui/productCard/card.module';
@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, LoadingModule, ProductCardModule, AppRoutingModule, SearchModule, FormsModule],
  exports: [MainPageComponent],
})
export class MainPageModule {}
