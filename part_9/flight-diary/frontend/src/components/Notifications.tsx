const Notifications = ({message}: {message: string | null}) => {
    if (!message) {
        return null
    }
        
    return(
        <div className='notification'>
            {message}
        </div>
    )
}

export default Notifications