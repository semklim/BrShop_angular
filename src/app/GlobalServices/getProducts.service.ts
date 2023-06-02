import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private _jsonURL = 'https://web-shop-step-default-rtdb.europe-west1.firebasedatabase.app/ecoproducts.json';

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<Product[]> {
    return this.http.get<Product[]>(this._jsonURL);
  }

  public addNew(obj: Product) {
    return this.http.post(this._jsonURL, obj);
  }
}
