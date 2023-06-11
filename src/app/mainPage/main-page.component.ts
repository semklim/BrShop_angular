import { Component, OnInit } from '@angular/core';
import { Product } from '../types/products';
import { FBaseService } from '../services/fbase.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  prod$?: Observable<Product[]>;

  constructor(private prodService: FBaseService) {}

  ngOnInit(): void {
    this.prod$ = this.prodService.getAllProducts();
  }
}
