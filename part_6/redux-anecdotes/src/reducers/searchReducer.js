const initialSearch = ''

//helper function for converting filter string --> object
const searchToObject = (searchTerm) => {
    return {searchTerm}
}

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

export default searchReducer