import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../../backend/src/types'

const baseUrl = '/api/diaries'

export const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
}

export const newEntry = async (newObject: NewDiaryEntry) => {
    const response = await axios.post<NewDiaryEntry>(baseUrl, newObject)
    return response.data
}