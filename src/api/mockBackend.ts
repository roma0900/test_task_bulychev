import { TableRowType } from "../types/tabletypes";

export const fetchBackendData = (): Promise<TableRowType[]> => {
    return new Promise(resolve =>
      setTimeout(() => resolve([{ id: 4, name: 'Backend item 1', price: 500 }, { id: 5, name: 'Backend item 2', price: 1000 },  { id: 6, name: 'Backend item 3', price: 2000 }]), 1000)
    );
  };