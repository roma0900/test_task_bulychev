import { createEffect, createStore } from 'effector';
import { TableRowType } from '../types/tabletypes';
import { fetchBackendData } from '../api/mockBackend';

//чтобы изначально были хоть какие-то данные к показу
const data: TableRowType[] = [
    { id: 1, name: 'Store item 1', price: 50 }, 
    { id: 2, name: 'Store item 2', price: 100 },  
    { id: 3, name: 'Store item 3', price: 200 }
]


export const $storeData = createStore<TableRowType[]>(data);

export const fetchData = createEffect({
    handler: async () => {
        return await fetchBackendData()
    }
})

$storeData.on(fetchData.done, (state, payload) => [...state, ...payload.result])

export const resetStore = () => {
    $storeData.reinit()
}
