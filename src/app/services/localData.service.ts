import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Product } from '../types/products';
/**

 * This is a service that mock FBaseService and provides same functionality for interacting with local database. It encapsulates methods related to retrieving, adding, and retrieving all products from the local database.
 * @Observable @method getAllProducts()
 * @async @method getProduct()
 * @async @method addData()
 */
@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private _jsonURL = 'data/EcoProduct.json';

  public prodacts$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.prodacts$ = this.http.get<Product[]>(this._jsonURL);
  }

  public async getProduct(product: Product) {
    const prodRes = await lastValueFrom(this.getAllProducts());
    const result = prodRes.filter((el) => el.id === product.id);
    if (!result[0]) return null;
    return result[0];
  }

  public getAllProducts(): Observable<Product[]> {
    return this.prodacts$;
  }

  public async addData(data: Product) {
    this.http.post(this._jsonURL, data);
  }
}
