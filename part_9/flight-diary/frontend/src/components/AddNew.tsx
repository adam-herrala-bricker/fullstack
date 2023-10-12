import { useState } from 'react'
import { newEntry } from '../services/diaryServices'
import { DiaryEntry, NewDiaryEntry } from '../../../backend/src/types'

//notice the wild syntax just to type setDiaries jfc
const AddNew = ({diaries, setDiaries}: {diaries: DiaryEntry[], setDiaries: React.Dispatch<React.SetStateAction<Array<DiaryEntry>>>}) => {
    //note you have to type the key as a string to get the indexing to work below (something something 'index signature'?)
    const defaultFormData: {[key: string]: string} = { date: '', visibility: '', weather: '', comment: ''}
    const [formData, setFormData] = useState(defaultFormData)

    //event handler
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        //note all the "as ..." assiginments required just to get it to work
        const addedEntry = await newEntry(formData as NewDiaryEntry)
        setDiaries([...diaries, addedEntry as DiaryEntry])
        
        setFormData(defaultFormData)

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                {Object.keys(defaultFormData).map(i =>
                    <div key = {i}>
                        {i} <input value = {formData[i]} onChange = {(event) => setFormData({...formData, [i]: event.target.value})}/>
                    </div>
                    )}
                <button type = 'submit'>add</button>
            </form>
        </div>
    )
}

export default AddNew