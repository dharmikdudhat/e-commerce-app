import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import { SignInOne } from './components/login.jsx'
import SignUpOne from './components/registration.jsx'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Layout />,
      children:[
        {
          path:"signin",
          element:<SignInOne />
        },
        {
          path:"signup",
          element:<SignUpOne />
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
    router={router}
    />
  </React.StrictMode>,
)
