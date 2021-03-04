import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useUser } from './User'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)
  const data = useUser()


  const pathname = window.location.pathname

  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name={user.name} active as={Link} to='/' />
      <Menu.Item
        name='sell'
        active={activeItem === 'sell'}
        as={Link}
        to='/sell'
      />
      <Menu.Item active={activeItem === 'cart'} as={Link} to='/cart'>
        Cart
        <span
          style={{
            background: 'red',
            color: 'white',
            padding: '3px',
            borderRadius: '50%'
          }}
        >
          {data && data.carts && data.carts.length === 0 && 0}
          {data &&
            data.carts &&
            data.carts.length > 0 &&
            data.carts.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout} />
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
