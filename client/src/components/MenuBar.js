import React, { useEffect, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// import { AuthContext } from '../context/auth';

function MenuBar() {
  // const { user, logout } = useContext(AuthContext);
  const [token, setToken] = useState(null)
  const pathname = window.location.pathname

  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  useEffect(() => {
    const token = localStorage.getItem('shopping-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  const menuBar = token ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout}/>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}

export default MenuBar
