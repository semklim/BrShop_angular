import { Component, OnInit } from '@angular/core';
import { Product } from './types/products';
import { FireStoreService } from './GlobalServices/fireStore.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Firestore, collection, onSnapshot, query } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  prod?: Product[];

  dbPath = '/ecoProducts';

  productsRef: AngularFireList<Product>;

  constructor(private fireStore: FireStoreService, private db: AngularFireDatabase, private firestore: Firestore) {
    this.productsRef = db.list(this.dbPath);
  }

  ngOnInit(): void {
    this.fireStore.getData().then((data) => (data ? (this.prod = data) : console.log('Error')));
    this.checkChange();

    // this.retrieveProducts();
  }

  checkChange() {
    const q = query(collection(this.firestore, 'ecoProducts'));
    return onSnapshot(q, (snapshot) =>
      snapshot.docChanges().map((change) => {
        if (change.type === 'added') {
          console.log('New city: ', change.doc.data());
          change.doc.data() as Product;
        }
        if (change.type === 'modified') {
          console.log('Modified city: ', change.doc.data(), change.doc.id);
          const product = change.doc.data() as Product;
          this.prod = this.prod?.map((el) => {
            if (el.product_id === product.product_id) {
              return product;
            }
            return el;
          });
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data());
          change.doc.data() as Product;
        }
        return null;
      }),
    );
  }

  retrieveProducts(): void {
    this.getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return { fireID: c.payload.key, ...c.payload.val() };
          }),
        ),
      )
      .subscribe((data) => {
        this.prod = data as Product[];
      });
  }

  create(product: Product) {
    return this.productsRef.push(product);
  }

  getAll(): AngularFireList<Product> {
    return this.productsRef;
  }
}
