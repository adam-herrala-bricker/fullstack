import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
