import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, lastValueFrom } from 'rxjs';
import { Product } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private _jsonURL = 'data/EcoProduct.json';

  constructor(private http: HttpClient) {}

  public async getProduct(product: Product) {
    return (async () => {
      const id = product.id;
      const source$ = this.getAll().pipe((res) => res);
      return lastValueFrom(source$);
    })();
  }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this._jsonURL);
  }

  public async addData(data: Product) {
    await (async () => this.http.post(this._jsonURL, data))();
  }
}
