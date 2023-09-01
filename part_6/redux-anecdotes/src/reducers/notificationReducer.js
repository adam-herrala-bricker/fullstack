import { createSlice } from '@reduxjs/toolkit'

const defaultNotification = null
const defaultTimeoutID = null

const asObject = (notification, timeoutID) => {
    return {notification : notification, timeoutID : timeoutID}
}

const notificationSlice = createSlice({
    name : 'notification',
    initialState : asObject(defaultNotification),
    reducers : {
        setNotification(state, action) {
            const lastTimeoutID = state.timeoutID
            clearTimeout(lastTimeoutID) //avoids weird timing bugs when mashing votes

            return asObject({...state, notification : action.payload})
        },

        clearNotification(state, action) {
            return asObject(defaultNotification, defaultTimeoutID)
        },

        setLastTimeoutID(state, action) {
            return({...state, timeoutID : action.payload})
        }
    }
})

export const { setNotification, clearNotification, setLastTimeoutID} = notificationSlice.actions

//full package for notifications
export const notifier = (message, timeout) => {
    return dispatch => {
        
        dispatch(setNotification(message))
        
        const thisTimeoutID = setTimeout(() => {
            dispatch(clearNotification())
        },timeout * 1000) //timeout given in seconds

        dispatch(setLastTimeoutID(thisTimeoutID))
        
    }
}
export default notificationSlice.reducer

