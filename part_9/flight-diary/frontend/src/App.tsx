import { useState, useEffect } from 'react'
import { getAll } from './services/diaryServices'
import { DiaryEntry } from '../../backend/src/types'
import Diaries from './components/Diaries'
import AddNew from './components/AddNew'
import Notifications from './components/Notifications'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState<string | null>(null)

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
      <Notifications message = {message}/>
      <AddNew diaries = {diaries} setDiaries = {setDiaries} setMessage = {setMessage}/>
      <Diaries diaries = {diaries}/>
    </div>
  )
}

export default App;
