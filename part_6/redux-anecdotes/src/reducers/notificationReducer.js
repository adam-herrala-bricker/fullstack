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
export default notificationSlice.reducer

