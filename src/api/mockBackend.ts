import { TableRowType } from "../types/tabletypes";

const mockData = [
  { id: 4, name: 'Backend item 1', price: 500 }, 
  { id: 5, name: 'Backend item 2', price: 1000 },  
  { id: 6, name: 'Backend item 3', price: 2000 }
]

export const fetchBackendData = (): Promise<TableRowType[]> => {
    return new Promise(resolve =>{
        setTimeout(() => resolve(mockData), 1000)
        // throw new Error("Ошибка")
      }
    )
  }