import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/types/products';

@Injectable({
  providedIn: 'root',
})
export class FireStoreLiteService {
  private dbPath = '/ecoProducts';

  readonly products: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
    this.products = db.collection(this.dbPath);
  }

  getAllProducts(): AngularFirestoreCollection<Product> {
    return this.products;
  }

  addData(data: Product, path = '/ecoProduct') {
    const collectionRef = this.db.collection<Product>(path);
    return collectionRef.add(data);
  }

  update(id: string, data: Product): Promise<void> {
    return this.products.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.products.doc(id).delete();
  }
}
