import { Injectable } from '@angular/core';
import { Product } from '../types/products';
import { Firestore, collection, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FBaseService {
  dbInstance = collection(this.firestore, 'ecoProducts');

  constructor(private firestore: Firestore) {}

  async getProduct(product: Product): Promise<Product | null> {
    const docRef = doc(this.firestore, 'ecoProducts', product.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Product;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  }

  async addData(data: Product): Promise<void> {
    data.id = doc(collection(this.firestore, 'id')).id;

    try {
      await addDoc(this.dbInstance, data);
      console.log('Data send');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.massage);
    }
  }

  getAll(): Observable<Product[]> {
    return collectionData(this.dbInstance, { idField: 'id' }) as Observable<Product[]>;
  }
}
