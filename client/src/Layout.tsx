import React from 'react'
import AppRoutes from 'app/AppRoutes'
import { AUTH_TOKEN } from 'app/const'

const Logout = (): JSX.Element => {
  if (!localStorage.getItem(AUTH_TOKEN)) {
    return null
  }
  return <button>Logout</button>
}

const Layout = (): JSX.Element => {
  return (
    <>
      <Logout />
      <AppRoutes />
    </>
  )
}

export default Layout