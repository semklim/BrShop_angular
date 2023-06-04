import { Injectable } from '@angular/core';
import { Product } from '../types/products';
import { Firestore, collection, addDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FBaseService {
  dbInstance = collection(this.firestore, 'ecoProducts');

  constructor(private firestore: Firestore) {}

  async getData() {
    const data = await getDocs(this.dbInstance);
    const answer = data.docs.map((item) => {
      return { ...item.data(), product_id: item.id };
    });
    return answer as Product[];
  }

  async addData(data: Product) {
    try {
      await addDoc(this.dbInstance, data);
      console.log('Data send');
    } catch (err: any) {
      console.log(err.massage);
    }
  }

  getAll() {
    return collectionData(this.dbInstance) as Observable<Product[]>;
  }
}
