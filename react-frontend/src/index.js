import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'assets/css/app.scss'
import 'assets/css/style.scss'
import 'utilities/auth'

ReactDOM.render(
  <div>
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
    />
    <Router />
  </div>,
  document.getElementById('root')
)
