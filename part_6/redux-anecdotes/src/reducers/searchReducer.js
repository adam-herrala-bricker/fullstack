import { createSlice } from '@reduxjs/toolkit'

const initialSearch = ''

//helper function for converting filter string --> object
const searchToObject = (searchTerm) => {
    return {searchTerm}
}

const searchSlice = createSlice({
    name: 'search',
    initialState: searchToObject(initialSearch),
    //note that the format of these is really different using createSlice vs. not
    reducers : {
        searcher(state, action) {
            return searchToObject(action.payload)
        }
    }
})

export const { searcher } = searchSlice.actions
export default searchSlice.reducer