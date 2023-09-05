import { createContext, useReducer } from 'react'

const defaultNotification = null

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'set':
            return action.payload
        case 'clear':
            return defaultNotification
        default:
            return state
    }
}

//this is where the state itself is stored
const NotificationContext = createContext()

//and this wraps the App component in main.jsx to pass the context to every component
export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, defaultNotification)

    return (
        <NotificationContext.Provider value = {[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext

