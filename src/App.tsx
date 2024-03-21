import {FC ,useState, ChangeEvent} from 'react';
import './App.css';
import DataTable from './components/DataTable/DataTable';
import { useUnit } from 'effector-react';
import { $storeData, fetchDataWithStatus, resetStore } from './store';

const App: FC = () => {
  const { loading, error, data: effectorData } = useUnit($storeData) 
  const [toggle, setToggle] = useState(false)
  

  const handleToggle = async(e: ChangeEvent<HTMLInputElement>)=>{
    if(e.target.checked) {
      try {
        await fetchDataWithStatus()
      }
      catch(err){
        console.error(err)
      }
    } else {
      resetStore()
    }
    setToggle(prevState=>!prevState)
  }

  return (
    <div className='App'>
      <label>
        Показать данные с бекенда:
        <input type="checkbox" checked={toggle} onChange={handleToggle} /> 
      </label>
      {error && (
        <label>Ошибка, данные с бека не получены</label>
      )}
      <DataTable data={effectorData} loading={loading} className='AppTable' />
    </div>
  )
}

export default App
