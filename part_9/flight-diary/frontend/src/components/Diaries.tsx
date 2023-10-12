import { useState, useEffect } from 'react'
import { getAll } from '../services/diaryServices'
import { DiaryEntry } from '../../../backend/src/types'

const Diaries = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const foundData = await getAll()
            setDiaries(foundData)
            
        }
        fetchData()
    }, [])
    console.log('diaries', diaries)

    return(
        <div>
            <h2>Entries</h2>
            {diaries.map(i => 
            <div key = {i.id}>
                <h3>{i.date}</h3>
                <div>Visibility: {i.visibility}</div>
                <div>Weather: {i.weather}</div>
                <div>Comments: {i.comment}</div>
            </div>
                
            )}
        </div>
    )
}

export default Diaries