import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private _jsonURL = 'data/EcoProduct.json';

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<Product[]> {
    return this.http.get<Product[]>(this._jsonURL);
  }
}
