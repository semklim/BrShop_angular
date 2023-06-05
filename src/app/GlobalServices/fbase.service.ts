import { Injectable } from '@angular/core';
import { Product } from '../types/products';
import { Firestore, collection, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**

 * This is an Angular service that provides functionality for interacting with Firebase Firestore. It encapsulates methods related to retrieving, adding, and retrieving all products from the Firestore database.
 * @method getAll()
 * @method getProduct()
 * @method addData()
 */
@Injectable({
  providedIn: 'root',
})
export class FBaseService {
  private dbInstance = collection(this.firestore, 'ecoProducts');

  constructor(private firestore: Firestore) {}

  /**

  Retrieves a product from Firestore based on the provided product ID.
  @param {Product} product - The product object containing the ID of the product to retrieve.
  @returns {Promise<Product | null>} A Promise that resolves to the retrieved product object if it exists,
  or null if the product does not exist.
  */
  async getProduct(product: Product): Promise<Product | null> {
    // Create a Firestore document reference using the product ID
    const docRef = doc(this.firestore, 'ecoProducts', product.id);

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
  async addData(data: Product): Promise<void> {
    // Generate a new ID for the product by Firebase
    data.id = doc(collection(this.firestore, 'id')).id;

    try {
      await addDoc(this.dbInstance, data);
      console.log('Data send');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.massage);
    }
  }

  /**

  Retrieves all products from Firestore.
  @returns {Observable<Product[]>} An Observable that emits an array of product objects.
  */
  getAll(): Observable<Product[]> {
    return collectionData(this.dbInstance, { idField: 'id' }) as Observable<Product[]>;
  }
}
