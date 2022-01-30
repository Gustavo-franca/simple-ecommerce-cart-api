export type Cart = {
  id: string;
  products: Product[];
};

export type Product = {
  id: string;
  quantity: number;
};
