import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import AuthRoute from './util/AuthRoute'
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SubscribeUser from './pages/SubscribeUser'

import Sell from './pages/Sell'
import { AuthProvider } from './context/auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/sell' component={Sell} />
          <Route exact path='/subscribe-user' component={SubscribeUser} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
