import { useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(i => i.notification).notification

  return (
    notification &&
    <div className = 'notification'>
      {notification.notification}
    </div>
  )
}

export default Notification