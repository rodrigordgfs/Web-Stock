export interface IProduct {
    id?: string;
    reference: string;
    name: string;
    category: {
      value: number,
      label: string,
    };
    description: string;
    unity: {
      value: number,
      label: string,
    };
    purchase: number;
    sale: number;
    inventory: number;
    minInventory: number;
    user?: string;
    createdAt?: string;
  }
  