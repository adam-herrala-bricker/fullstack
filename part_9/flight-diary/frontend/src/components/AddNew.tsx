import axios from 'axios'
import { useState } from 'react'
import { newEntry } from '../services/diaryServices'
import { DiaryEntry, NewDiaryEntry } from '../../../backend/src/types'

//notice the wild syntax just to type setDiaries jfc
const AddNew = ({diaries, setDiaries, setMessage}: 
    {
        diaries: DiaryEntry[], 
        setDiaries: React.Dispatch<React.SetStateAction<Array<DiaryEntry>>>, 
        setMessage: React.Dispatch<React.SetStateAction<string | null>>}) => 
    {
    //note you have to type the key as a string to get the indexing to work below (something something 'index signature'?)
    const defaultFormData: {[key: string]: string} = { date: '', visibility: '', weather: '', comment: ''}
    const [formData, setFormData] = useState(defaultFormData)
    console.log(formData)

    //event handler
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        //note all the "as ..." assiginments required just to get it to work
        try {
            const addedEntry = await newEntry(formData as NewDiaryEntry)
            setDiaries([...diaries, addedEntry as DiaryEntry])
            
            setFormData(defaultFormData)

        } catch (error: unknown) {
            //type checks with zero payoff
            if (axios.isAxiosError(error)) {
                if (typeof error.response === 'object') {
                    setMessage(error.response.data)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                }
            }
        }
    
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type = 'date' value = {formData.date} onChange = {(event) => setFormData({...formData, date: event.target.value})}/>
                </div>
                <div>
                    visibility:
                    great <input type = 'radio' name = 'visibility' value = 'great' onClick={() => setFormData({...formData, visibility: 'great'})}/>
                    good <input type = 'radio' name = 'visibility' value = 'good' onClick={() => setFormData({...formData, visibility: 'good'})}/>
                    ok <input type = 'radio' name = 'visibility' value = 'ok' onClick={() => setFormData({...formData, visibility: 'ok'})}/>
                    poor <input type = 'radio' name = 'visibility' value = 'poor' onClick={() => setFormData({...formData, visibility: 'poor'})}/>
                </div>
                <div>
                    weather:
                    sunny <input type = 'radio' name = 'weather' value = 'sunny' onClick={() => setFormData({...formData, weather: 'sunny'})}/>
                    rainy <input type = 'radio' name = 'weather' value = 'rainy' onClick={() => setFormData({...formData, weather: 'rainy'})}/>
                    cloudy <input type = 'radio' name = 'weather' value = 'cloudy' onClick={() => setFormData({...formData, weather: 'cloudy'})}/>
                    stormy <input type = 'radio' name = 'weather' value = 'stormy' onClick={() => setFormData({...formData, weather: 'stormy'})}/>
                    windy <input type = 'radio' name = 'weather' value = 'windy' onClick={() => setFormData({...formData, weather: 'windy'})}/>
                </div>
                <div>
                    comments: <input value = {formData.comment} onChange = {(event) => setFormData({...formData, comment: event.target.value})}/>
                </div>
                    
                <button type = 'submit'>add</button>
            </form>
        </div>
    )
}

export default AddNew