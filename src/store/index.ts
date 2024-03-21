import { createEffect, createEvent, createStore } from 'effector';
import { TableRowType } from '../types/tabletypes';
import { fetchBackendData } from '../api/mockBackend';

//чтобы изначально были хоть какие-то данные к показу
const data: TableRowType[] = [
    { id: 1, name: 'Store item 1', price: 50 }, 
    { id: 2, name: 'Store item 2', price: 100 },  
    { id: 3, name: 'Store item 3', price: 200 }
]

type StoreDataState = {
    loading: boolean;
    error: Error | null;
    data: TableRowType[];
  };

const setLoading = createEvent<boolean>()
const setError = createEvent<Error | null >()
const addData = createEvent<TableRowType[]>()
export const resetStore = createEvent()

const initialStoreData: StoreDataState = {
    loading: false,
    error: null,
    data: data,
  };

export const $storeData = createStore<StoreDataState>(initialStoreData)


$storeData
  .on(setLoading, (state, loading) => ({ ...state, loading }))
  .on(setError, (state, error) => ({ ...state, error }))
  .on(addData, (state, newData) => ({ ...state, data: [...state.data, ...newData] }))
  .reset(resetStore)

// Эффект для загрузки данных с бекенда
export const fetchDataWithStatus = createEffect<void, TableRowType[], Error>({
  handler: async () => {
    try {
      setLoading(true)
      const result = await fetchBackendData()
      addData(result)
      setLoading(false)
      return result
    } catch (error) {
      setError(error as Error)
      setLoading(false)
      throw error
    }
  },
})

resetStore.watch(() => $storeData.reinit())
