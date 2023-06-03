import { Injectable } from '@angular/core';
import { Product } from '../types/products';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  dbInstance = collection(this.firestore, 'ecoProducts');

  constructor(private firestore: Firestore) {}

  getData() {
    return getDocs(this.dbInstance).then((data) => {
      const answer = data.docs.map((item) => {
        return { ...item.data() };
      });
      return answer as Product[];
    });
  }

  addData(data: Product) {
    if (!data) return;
    addDoc(this.dbInstance, data)
      .then(() => {
        console.log('Data send');
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }
}
