export interface Product {
  id: string;
  title: string;
  price: number;
  /** Цена до скидки (если есть) */
  originalPrice?: number;
  /** Процент скидки, например 17 */
  discountPercent?: number;
  description: string;
  category: string;
  finish: string;
  dimensions: string;
  mainImage: string;
  images: string[];
  thumbnail: string;
}
