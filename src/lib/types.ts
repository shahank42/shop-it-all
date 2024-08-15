export interface Product {
  id: number;
  title: string;
  price: number;
  currency: string;
  image: string;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  subTotal: number;
  discount: Discount | null;
  total: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type DiscountType = "flat" | "percentage";

export interface Discount {
  code: string;
  description: string;
  type: DiscountType;
  value: number;
}