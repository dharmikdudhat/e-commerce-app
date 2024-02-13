/* eslint-disable no-unused-vars */
import React from 'react'
import { Navbar } from '../navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default Layout