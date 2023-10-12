import { useState, useEffect } from 'react'
import { getAll } from './services/diaryServices'
import { DiaryEntry } from '../../backend/src/types'
import Diaries from './components/Diaries'
import AddNew from './components/AddNew';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
      const fetchData = async () => {
          const foundData = await getAll()
          setDiaries(foundData)
          
      }
      fetchData()
  }, [])
  return(
    <div>
      <h1>Flight Diary</h1>
      <AddNew diaries = {diaries} setDiaries = {setDiaries}/>
      <Diaries diaries = {diaries}/>
    </div>
  )
}

export default App;
