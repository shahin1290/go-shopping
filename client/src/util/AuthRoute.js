import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function AuthRoute({ component: Component, ...rest }) {
  const { accessToken } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
