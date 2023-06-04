import { Review } from './review';
import { ProdSpecific } from './specific';

export interface Product {
  fireId?: string;
  category: string;
  currency: string;
  description: string;
  features: Array<string>;
  image_url: Array<string>;
  price: number;
  id: string;
  name: string;
  rating: number;
  reviews: Array<Review>;
  specifications: ProdSpecific;
  stock_quantity: number;
}
