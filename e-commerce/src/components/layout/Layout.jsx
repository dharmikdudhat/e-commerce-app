/* eslint-disable no-unused-vars */
import React from 'react'
import { Navbar } from '../navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout