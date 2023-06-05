import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Product } from '../types/products';
/**

 * This is a service that mock FBaseService and provides same functionality for interacting with local database. It encapsulates methods related to retrieving, adding, and retrieving all products from the local database.
 * @method getAll()
 * @method getProduct()
 * @method addData()
 */
@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private _jsonURL = 'data/EcoProduct.json';

  constructor(private http: HttpClient) {}

  public async getProduct(product: Product) {
    return (async () => {
      const prodRes = await lastValueFrom(this.getAll());
      const result = prodRes.filter((el) => el.id === product.id);
      if (!result[0]) return null;
      return result[0];
    })();
  }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this._jsonURL);
  }

  public async addData(data: Product) {
    await (async () => this.http.post(this._jsonURL, data))();
  }
}
