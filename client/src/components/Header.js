import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Cart from './Cart'
import Nav from './Nav'

const Logo = styled.h1`
  background: red;
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
`

const Header = () => {
  return (
    <HeaderStyles>
      <div className='bar'>
        <Logo>
          <Link to='/products'>Sick fits</Link>
        </Logo>
        <Nav />
      </div>
      <Cart />
    </HeaderStyles>
  )
}

export default Header
