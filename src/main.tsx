import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import { store } from './redux/store.js'

const rootEl = document.getElementById('root')

if(rootEl) {
  createRoot(rootEl).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )  
}