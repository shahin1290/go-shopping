import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  accessToken: null
}

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.accessToken = decodedToken
  }
}

const AuthContext = createContext({
  accessToken: null,
  login: (token) => {},
  logout: () => {}
})

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        accessToken: action.payload.accessToken
      }
    case 'LOGOUT':
      return {
        ...state,
        accessToken: null
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(data) {
    localStorage.setItem('jwtToken', data.accessToken)
    dispatch({
      type: 'LOGIN',
      payload: data
    })
  }

  function logout() {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken: state.accessToken,
        login,
        logout
      }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
