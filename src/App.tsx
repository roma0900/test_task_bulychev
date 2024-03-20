import {FC ,useState, useEffect, ChangeEvent, useCallback} from 'react';
import './App.css';
import DataTable from './components/DataTable/DataTable';
import { useUnit } from 'effector-react';
import { $storeData, fetchData, resetStore } from './store';
// импорты для закоменченного кода
// import { TableRowType } from './types/tabletypes';
// import { fetchBackendData } from './api/mockBackend';
// import { $storeData } from './store';

const App: FC = () => {
  const effectorData = useUnit($storeData) 
  const [toggle, setToggle] = useState(false)
  const [loading, setloading] = useState(false)

  // в принципе закоменченный код тоже выполнял поставленную задачу, решил на всякий случай оставить 

  // const [tableData, setTableData] = useState<TableRowType[]>(effectorData)

  // useEffect(()=>{
  //   const getBackendData = async () =>{
  //       setloading(true)
  //       const data = await fetchBackendData()
  //       setTableData((prevstate)=> [...prevstate, ...data])
  //       setloading(false)
  //   }
  //   toggle ? getBackendData() : setTableData(effectorData)

// },[ setTableData, toggle, effectorData ])

  const handleToggle = useCallback(async(e: ChangeEvent<HTMLInputElement>)=>{
    if(e.target.checked) {
      setloading(true)
      await fetchData()
      setloading(false)
    } else {
      resetStore()
    }
    setToggle(prevState=>!prevState)
  }, [])

  return (
    <div className='App'>
      <label>
        Показать данные с бекенда:
        {/* <input type="checkbox" checked={toggle} onChange={e => setToggle(e.target.checked)} /> */}
        <input type="checkbox" checked={toggle} onChange={handleToggle} /> 
      </label>
      {/* <DataTable data={tableData} loading={loading} /> */}
      <DataTable data={effectorData} loading={loading} className='AppTable' />
    </div>
  )
}

export default App
