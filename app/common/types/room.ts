export interface IProduct {
  name: string;
  value: number;
}

export interface IRoom {
  id: string;
  products: IProduct[];
}
