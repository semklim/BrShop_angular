export interface ProductShoes {
  docId?: string;
  id: string | number;
  category: string;
  title: string;
  subtitle: string;
  currency: string;
  price: string | number;
  sizes: Array<string | number | null>;
  imageMain: string;
  imagesUrls: Array<string>;
  color: { type: string; name: string; hex: string | number };
  colors: Array<object>;
  rating: string | number;
  reviews: Array<object>;
  description: string;
}
