import { DiaryEntry } from '../../../backend/src/types'

const Diaries = ({diaries}: {diaries: DiaryEntry[]}) => {
   

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