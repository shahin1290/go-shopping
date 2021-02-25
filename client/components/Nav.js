import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'


/* const ME = gql`
  query me {
    name
  }
` */

const Nav = () => {
 

 

  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/products'>
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href='/signin'>
            <a>Sign In</a>
          </Link>
        </li>
        <li>
          <Link href='/signup'>
            <a>Sign Up</a>
          </Link>
        </li>
        
      </ul>
    </nav>
  )
}

export default Nav
