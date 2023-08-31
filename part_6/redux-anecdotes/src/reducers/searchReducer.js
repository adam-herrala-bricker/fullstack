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

/*
//action creator
export const search = (searchTerm) => {
    return {type : 'search', payload : searchToObject(searchTerm)}
}


const initialState = searchToObject(initialSearch)

//main body of reducer
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'search' : {
            return searchToObject(action.payload.searchTerm)
        }
    default: return state
    }
}
*/

export const { searcher } = searchSlice.actions
export default searchSlice.reducer