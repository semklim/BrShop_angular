import { Review } from './review';
import { ProdSpecific } from './specific';

export interface Product {
  category: string;
  currency: string;
  description: string;
  features: Array<string>;
  image_url: Array<string>;
  price: number;
  product_id: string;
  product_name: string;
  rating: number;
  reviews: Array<Review>;
  specifications: ProdSpecific;
  stock_quantity: number;
}
