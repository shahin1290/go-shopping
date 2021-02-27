import React from 'react'

const SetError = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default SetError
