import { Injectable } from '@angular/core';
import { Product } from '../../types/products';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/**

 * This is an Angular service that provides functionality for interacting with Firebase Firestore. It encapsulates methods related to retrieving, adding, and retrieving all products from the Firestore database.
 * @Observable @method getAllProducts()
 * @async @method getProduct()
 * @async @method addData()
 */
@Injectable({
  providedIn: 'root',
})
export class FBaseService {
  private dbInstance = collection(this.firestore, 'shoesProducts');

  prodacts$: Observable<Product[]>;

  constructor(private firestore: Firestore, private http: HttpClient) {
    this.prodacts$ = this.getAll();
  }

  genFireId(): string {
    return doc(collection(this.firestore, 'id')).id;
  }

  /**

  Retrieves all products from Firestore.
  @returns {Observable<Product[]>} An Observable that emits an array of product objects.
  */
  getAllProducts(): Observable<Product[]> {
    return this.prodacts$;
  }

  /**

  Retrieves a product from Firestore based on the provided document ID.
  @param {string} docId - The document ID of the product to retrieve.
  @returns {Promise<Product | null>} A Promise that resolves to the retrieved product object if it exists,
  or null if the product does not exist.
  */
  async getProduct(docId: string, path = 'shoesProducts'): Promise<Product | null> {
    // Create a Firestore document reference using the product ID
    const docRef = doc(this.firestore, path, docId);

    // Retrieve the document snapshot from Firestore
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Product;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  }

  /**

  Adds a new product data to Firestore.
  @param {Product} data - The product data to be added to Firestore.
  @returns {Promise<void>} A Promise that resolves when the data is successfully added to Firestore.
  */
  async addData(data: Product, path = 'shoesProducts'): Promise<void> {
    // Generate a new ID for the product by Firebase
    data.id = doc(collection(this.firestore, 'id')).id;
    const dbInstance = collection(this.firestore, path);
    try {
      await addDoc(dbInstance, data);
      console.log('Data send');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.massage);
    }
  }

  async deleteData(product: Product): Promise<void> {
    const docRef = doc(this.firestore, 'shoesProducts', product.docId!);
    console.log(
      `you are delete product ${product.title} 
    ${product.id}
    ${product.docId}`,
    );

    return deleteDoc(docRef);
  }

  async updateData(docId: string, dataForUpdate: Partial<Product>): Promise<void> {
    const docRef = doc(this.firestore, 'shoesProducts', docId);
    return updateDoc(docRef, dataForUpdate);
  }

  /**

  Retrieves all products from Firestore.
  @returns {Observable<Product[]>} An Observable that emits an array of product objects.
  */
  private getAll(): Observable<Product[]> {
    return collectionData(this.dbInstance, { idField: 'docId' }) as Observable<Product[]>;
  }
}
