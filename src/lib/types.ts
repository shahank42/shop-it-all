export interface Product {
  id: number;
  title: string;
  price: number;
  currency: string;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartItem extends Product {
  quantity: number;
}